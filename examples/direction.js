// Get driving direction using Google Directions API.

if (phantom.state.length === 0) {
    var origin, dest;
    if (phantom.args.length < 2) {
        console.log('Usage: direction.js origin destination');
        console.log('Example: direction.js "San Diego" "Palo Alto"');
        phantom.exit(1);
    }
    origin = phantom.args[0];
    dest = phantom.args[1];
    phantom.state = origin + ' to ' + dest;
    phantom.open(encodeURI('http://maps.googleapis.com/maps/api/directions/xml?origin=' + origin +
                '&destination=' + dest + '&units=imperial&mode=driving&sensor=false'));
} else {
    if (phantom.loadStatus === 'fail') {
        console.log('Unable to access network');
    } else {
        var steps = phantom.content.match(/<html_instructions>(.*)<\/html_instructions>/ig);
        if (steps == null) {
            console.log('No data available for ' + phantom.state);
        } else {
            steps.forEach(function (ins) {
                ins = ins.replace(/\&lt;/ig, '<').replace(/\&gt;/ig, '>');
                ins = ins.replace(/\<div/ig, '\n<div');
                ins = ins.replace(/<.*?>/g, '');
                console.log(ins);
            });
            console.log('');
            console.log(phantom.content.match(/<copyrights>.*<\/copyrights>/ig).join('').replace(/<.*?>/g, ''));
        }
    }
    phantom.exit();
}
