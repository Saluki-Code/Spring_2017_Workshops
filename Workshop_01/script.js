function TimeSegment(options){
  this.base;
  this.duration;
  this.start;
  this.end;
  
  this.init(options); // initialize instance
} 
TimeSegment.prototype.init = function(opt) {
  var tmpBase = 0; // TODO
  
  this.base = ( opt.base == null ? tmpBase : opt.base );
  this.duration = ( opt.duration == null ? {hours: 0, minutes: 0} : opt.duration );
  this.start = ( opt.start == null ? new Date() : opt.start );
  this.end = ( opt.end == null ? new Date() : opt.end );
}
TimeSegment.prototype.getBase = function() {
  return this.base;
}
TimeSegment.prototype.setHour = function(startOrEnd, hour) {
  // TODO: add checks
  startOrEnd.setHours(hour);
}
TimeSegment.prototype.setMinute = function(startOrEnd, minute) {
  // TODO: add checks
  startOrEnd.setMinutes(minute);
}
TimeSegment.prototype.setStartHourMinute = function (hour, minute) {
  // TODO: add checks
  this.setHour(this.start, hour);
  this.setMinute(this.start, minute);
}
TimeSegment.prototype.setEndHourMinute = function (hour, minute) {
  // TODO: add checks
  this.setHour(this.end, hour);
  this.setMinute(this.end, minute);
}
TimeSegment.prototype.isHourMinuteAfter = function(date1, date2) { // is date 2 after date 1 in terms of hours and minutes
	var hourAfter = ( date2.getHours() > date1.getHours() ? true : false );
	var minuteAfter = ( date2.getMinutes() > date1.getMinutes() ? true : false );
	
	if(date1.getHours() == date2.getHours()) {
		// same hour but date 2 has a minute later than date 1
		if(minuteAfter) {
			// console.log("D1: " + date1 + ", D2:" + date2 + "... date2 is after date1");
			return true;			
		}
	} else if ( hourAfter ) {
		// date2 has an hour after date 1, automaticly after duhh
		return true;
	}
	
	// console.log("D1: " + date1 + ", D2:" + date2 + "... date1 is after date2");

	return false;
}
TimeSegment.prototype.setDuration = function(duration, startTime) {
	this.duration.hours = ( duration.hours ? duration.hours : 1 );
	this.duration.minutes = ( duration.minutes ? duration.minutes : 1 );
	
	if(startTime) {
		this.start = startTime;
	}
	
	// error when go over into the next day! TODO!
	this.end.setHours(duration.hours);
	this.end.setMinutes(duration.minutes);
}
TimeSegment.prototype.update = function() {
	var currentTime = new Date();
	var myStart = this.start;
	var myEnd = this.end;
	
	var validStart = this.isHourMinuteAfter(myStart, currentTime); // is currentTime after startTime?
	var validEnd = this.isHourMinuteAfter(currentTime, myEnd); // is endTime after currentTime?

	if(validEnd && validStart) {
		// do something
		this.getBase().css({background: "#7851a9"});
	} else {
		// do something else
		this.getBase().css({background: "grey"});
	}
}

function TimeSegments(options){
	this.bases;
  	this.divideEqually; // TODO
  	
	this.init(options); // initialize instance
	this.continuouslyUpdate(); // we should always be updating our bases
} 
TimeSegments.prototype.init = function(opt) {
  opt = ( opt == null ? {} : opt);
  
  this.bases = ( opt.bases == null ? [] : opt.bases );
  this.divideEqually = ( opt.divideEqually == null ? false : opt.divideEqually ); // TODO
}
TimeSegments.prototype.getBases = function() {
  return this.bases;
}
TimeSegments.prototype.addSegment = function(segment) {
	// TODO: Check for valid segment
	this.getBases().push(segment);
}
TimeSegments.prototype.createSegment = function(options) {
	var newSegment = new TimeSegment(options);
	this.getBases().push(newSegment);
}
TimeSegments.prototype.continuouslyUpdate = function(options) {
	var _tmpThis = this;
	
	setInterval(function() {
		// update each segment
		$.each( _tmpThis.getBases(), function() {
			this.update();
		});
	}, 100);
}
