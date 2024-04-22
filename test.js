const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/pcat-test-db');

const PhotoSchema = new Schema({
  title: String,
  description: String
});

const Photos = mongoose.model('photos', PhotoSchema);

//Create a photo

/* Photos.create({
    title: "photo 4",
    description: "photo Descriptin 4"
}) */

/* Photos.find({}, (err, result) =>{
    console.log(result)
})
 */
const id = '625d46d9580d5123fec62b26';

/* Photos.findByIdAndUpdate(
  id,
  {
    title: 'photo 232',
    description: 'photo 232'
  },
  {
    new: true
  },
  (err, doc, res) => {
    console.log(err + '\n' + doc);
  }
);
 */

Photos.findByIdAndDelete(id,(err,data) =>{
    console.log("silindi")
})