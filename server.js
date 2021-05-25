app.listen(process.env.PORT || 3000, function(){
  console.log("Node app is running at localhost:" + app.get('port'));
});
