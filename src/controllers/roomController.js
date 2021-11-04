import { roomService } from '../services';

const getRoomList = async (req, res, next) => {
  try {
    const { id } = req.params;

    if(id===undefined){ 
      res.status(400).json({
      message: 'no exist hotel id'
    });
  };
    const data = await roomService.getRoomList(id);
    console.log(data);
    res.status(200).json({data});
  } catch (error) {
    console.log(error); 
  }
};

const getRoomImage = async (req,res) => {
  try{
    const data = await roomService.getRoomImage();
  console.log(data)
  res.status(200).json({data})
}catch(err){
  console.log(err);
  res.json({error:"Error"})
}
}

export default { getRoomList, getRoomImage };