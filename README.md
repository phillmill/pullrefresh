# jQuery pull to refresh

A very simple, lightweight jQuery plugin to "pull to refresh". Can be very useful in phonegap or cordova applications.

<h2>Usage</h2>

First, include the pullrefresh jQuery plugin
```html
<script src="js/pullrefresh.jquery.js"></script>
```
Then create a list of data with pull to refresh functionality:

```html
<div id="thelist">
    <ul>   
        <li>Sample item</li>
        <li>Sample item</li>
        <li>Sample item</li>
        <li>Sample item</li>
        <li>Sample item</li>
    </ul>
</div>
  ```
  
Finally, apply pull to refresh functionality with javascript snippet below. NOTE: you must implement jQuery deffered that you see in the example below or the plugin will not work. So if you're using ajax to retrieve your data you need run r.resolve() within the success callback.
  
```js
$(document).ready(function() {
    $('#thelist').pullrefresh({
        // fetch_data is the function that will be called to fetch the "refreshed data"
        // the first argument in r.resolve() will be the HTML markup that will be applied to your list
        fetch_data: function() {
            var r = $.Deferred();
            r.resolve('<ul><li>Refreshed Sample item</li><li>Refreshed Sample item</li><li>Refreshed Sample item</li><li>Refreshed Sample item</li><li>Refreshed Sample item</li></ul>');
            return r;
        }
    });
});
```

