import doctorModel from "../models/doctorModel.js"


const changeAvailablity = async (req, res) => {

    try {
        
        const {docId} = req.body

        const docdata = await doctorModel.findById(docId)

        await doctorModel.findByIdAndUpdate(docId,{available: !docdata.available})

        res.json({success:true, message:'Availablity changed'})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])

        res.json({success:true, doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {changeAvailablity, doctorList}