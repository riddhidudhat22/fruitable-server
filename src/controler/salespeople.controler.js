const { salespeople } = require("../model");



const listselspeople = async (req, res) => {
    try {
        const s_people = await salespeople.salepeoplemodel();

        res.status(200).json({
            success: true,
            data: s_people,
            message: 'selspeople fetch susscss',
        })
    } catch (error) {
    
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message,
            data: []
        })
    }
}

const addselspeople = async (req, res) => {
    try {
        const { SNAME, CITY, COMM,isActive } = req.body;

        const insert = await salespeople.addsalespeoplemodel(SNAME, CITY, COMM,isActive)
        res.status(200).json({
            success: true,
            data: insert,
            message: 'selspeople inserted susscss',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message,
            data: []
        })
    }
}

const deleteselspeople = async (req, res) => {
    try {
        const { SNUM } = req.params;

        const deletedata = await salespeople.deleteselsepeople(SNUM)
        console.log(deletedata);

        res.status(200).json({
            success: true,
            data: deletedata,
            message: 'selspeople delete susscss',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message,
            data: []
        })
    }
}

const updateselpeople = async (req, res) => {
    try {
        const { SNUM } = req.params;
        const { SNAME, CITY, COMM ,isActive} = req.body;

        const updatedata = await salespeople.updatesalespeople(SNUM, SNAME, CITY, COMM,isActive);
        
        res.status(200).json({
            success: true,
            data: updatedata,
            message: 'Salespeople updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error: ' + error.message,
            data: [],
        });
    }
};

module.exports = {
    listselspeople,
    addselspeople,
    deleteselspeople,
    updateselpeople
}