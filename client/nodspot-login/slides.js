// given a slider, return associated slides from the collection
function slides(slider){
  return Slides.find({
    sliderId:slider._id
  });
}

// assumes the slider template is called with a slider as data context
Template.slider.helpers({
  slides:function(){
    return slides(this);
  }
});

Template.pageSlider.helpers({
  mySlider:function(){
    return Sliders.findOne({
      name:"mySlider"
    });
  }
});

Template.slider.rendered=function(){
  this.autorun(_.bind(function(){
    // we assume that the data context (this.data) is the slider doc itself
    // this line of code makes our computation depend on changes done to
    // the Slides collection
    var slidesCursor=slides(this.data);
    // we wait until the #each block invalidation has finished inserting items
    // in the DOM
    Deps.afterFlush(function(){
      // here it is safe to initialize your jQuery plugin because DOM is ready
    });
  }, this));
};
