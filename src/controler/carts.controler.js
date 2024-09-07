const Carts = require("../model/carts.model");

const getCart = async (req, res) => {
    try {
        const cart = await Carts.findOne({ users_id: req.params.users_id }).exec();
        console.log(cart);

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cart found successfully',
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
};





const addCart = async (req, res) => {
    try {
            console.log('Request body:', req.body);
            const { users_id, isActive = true, items } = req.body;
            console.log("dfddfffgdg");

        let cart = await Carts.findOne({ users_id });

        if (!cart) {
            cart = new Carts({ users_id, isActive, items });
        } else {
            items.forEach(item => {
                const itemIndex = cart.items.findIndex(v => v.product_id.toString() === item.product_id);
                if (itemIndex !== -1) {
                    cart.items[itemIndex].quntity += item.quntity;
                } else {
                    cart.items.push({ product_id: item.product_id, quntity: item.quntity });
                }
            });
        }
        await cart.save();

        res.status(201).json({
            success: true,
            message: 'Cart add successfully.',
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
};

const updateCart = async (req, res) => {
    try {
      const cart = await Carts.findByIdAndUpdate(req.params.cart_id, req.body,{ new: true, runValidators: true });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Cart updated successfully',
        data: cart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal error: ' + error.message,
      });
    }
  };
  
    const deleteCartItem = async (req, res) => {
        try {
            const { cart_id, product_id } = req.params;
    
            const cart = await Carts.findById(cart_id);
            if (!cart) {
                return res.status(404).json({
                    success: false,
                    message: 'Cart not found'
                });
            }
    
          
            const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
            if (itemIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found in cart'
                });
            }
    
          
            cart.items.splice(itemIndex, 1);
            await cart.save();
    
            res.status(200).json({
                success: true,
                message: 'Product removed from cart successfully',
                data: cart
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error: ' + error.message
            });
        }
    };
module.exports = {
    getCart,
    addCart,
    updateCart,
    deleteCartItem
}