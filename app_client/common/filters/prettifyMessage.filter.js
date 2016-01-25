(function () {
  angular
    .module('weMessageApp')
    .filter('prettifyMessage', prettifyMessage);

  function prettifyMessage() {
    // add links
    function linkify(message) {
      var links = [];
      var containsLink = message.search(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/);
      if(containsLink != -1) {
        var splitMessage = message.split(' ');
        for(var i = 0; i < splitMessage.length; i++) {
          if(splitMessage[i].search(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/) != -1) {
            var linkText = splitMessage[i];
            var linkUrl = splitMessage[i];
            links.push(splitMessage[i]);
            // Add URL prefix if not present
            if(linkUrl.search(/^http.*$/) == -1) {
              linkUrl = 'http://' + linkUrl;
            }
            splitMessage[i] = '<a href="' + linkUrl + '" target="_blank">' + linkText + '</a>';
          }
        }
        message = splitMessage.join(' ');
        containsLink = true;
      }
      return {
        content: message,
        links: links
      };
    }

    // return filtered message
    return function(message) {
      var linked = linkify(message)
      message = linked.content;
      var links = linked.links;
      if(links) {
        console.log(links);
      }
      return message;
   };
  }
})();
