Pager
=====
Pager is a JavaScript library created in an afternoon to fill a void of simple libraries for
Single Page Apps (SPAs). With the aim of facilitating simple page transitions and easy
developement and integration into existing projects, **Pager fits into 1483 bytes uncompressed
with the license header**.

Currently the only dependancy is JQuery, and that isn't very far entrenched in it (although I'm
not sure how a library could be entrenched in a 1483 byte library). Probably works with
Zepto.js, but I've never actually checked.

Documentation
=============
Considering the entire library is written in 89 lines of code, it shouldn't be very difficult
to just look at the code and discern what it does. However, please note that
you should really only be using Pager.loadPage(...), Pager.registerPage(...),
Pager.getPage(...), and Pager.back().

Explain to me how and when I would use Pager.
=============================================
Pager is used to facilitate multi-page apps without sending a seperate HTTP request to the
server for each page. This is useful for things like persistent connections to server and
webapps that are implemented entirely on the clientside (for example, this would be very
useful with Firebase).