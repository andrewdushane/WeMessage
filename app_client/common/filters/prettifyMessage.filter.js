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
            var linkUrl = linkText;
            // Remove punctuation from end of link if present
            var characters = ['.', ',', ';', ':', '?', '\\']
            for(var j = 0; j < characters.length; j++) {
              if(linkUrl.endsWith(characters[j])) {
                var splitLink = linkUrl.split(characters[j]);
                splitLink.pop();
                linkUrl = splitLink.join(characters[j]);
                break;
              }
            }
            // Add URL prefix if not present
            if(linkUrl.search(/^http.*$/) == -1) {
              linkUrl = 'http://' + linkUrl;
            }
            splitMessage[i] = '<a href="' + linkUrl + '" target="_blank">' + linkText + '</a>';
            links.push(linkUrl);
          }
        }
        message = splitMessage.join(' ');
      }
      return {
        content: message,
        links: links
      };
    }

    function displayImages(message, links) {
      var numLinks = links.length;
      var imgTypes = ['jpg', 'png', 'gif']
      for(var i = 0; i < numLinks; i++) {
        var l = links[i];
        if(l.endsWith('jpg') || l.endsWith('png') || l.endsWith('gif')) {
          message += '<br><img src="' + l + '">';
          links.splice(i, 1);
        }
      }
      return {
        content: message,
        links: links
      }
    }

    function displayBase64(message) {
      if(message.search('data:image/') != -1) {
        message = '<img src="' + message + '">';
        return message;
      }
      else return false;
    }

    // Filter message
    return function filterMessage(message) {
      // Display Base 64 image and exit filter
      if(displayBase64(message)) {
        message = displayBase64(message);
        return message;
      }
      // detect and linkify links
      var linked = linkify(message)
      // detect image links and display as images
      if(linked.links) {
        var imaged = displayImages(linked.content, linked.links);
        message = imaged.content;
      }
      return message;
   };

    // ES6 .endsWith polyfill
    if (!String.prototype.endsWith) {
      String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
          position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
      };
    }

  }
})();
