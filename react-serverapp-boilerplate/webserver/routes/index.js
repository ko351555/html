var express = require('express');
var router = express.Router();
var blogspot = require('./resdetails');

/* GET home page. */
router.post('/add', function(req, res, next) {
        //var title = req.body.t;itle;
        var movie = blogspot(req.body);
        movie.save(function(err,data){
        	if(err){
        		res.send("error")
        	}
        	else{
                console.log("print success"+data)
                res.send("Data: "+data)
            }
        })


    });
router.delete('/del',function(req,res){
  let restaurantId = req.body.id;

  blogspot.findByIdAndRemove({_id:restaurantId},function(err,data2){
    if(err){
        res.send("error")
    }
    else{

        res.send('Deleted the id ' + restaurantId + ' successfully'+data2)
    }
})

})
router.get('/viewData',function(req,res){

    blogspot.find(function(err,data2){
        if(err){
            res.send("error")
        }
        else{
            res.send(data2)
        }
    })
    
})
router.put('/updatebyid',function(req,res){
    blogspot.update({_id: req.body.id},
       { $set: {comments: req.body.comment}}, function(err, users) {
           if(err){
            res.send("error")
        }
        else{
            res.send(users)
        }
    })

})





module.exports = router;
