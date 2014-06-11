## Smart Menu

A plugin that will adapt the menu according to the size of the container.

It will collapse all menus that break the inline of the menu into another menu and display those menus as submenus.

See [demo](http://hmarcelino.github.io/smartMenu)!

## API

```html     
<ul class="menus-container">
	<li>Menu small</li>
	<li>Menu little bigger</li>
	<li>Menu small</li>
	<li>Menu little bigger</li>
	<li>Menu little bigger</li>
	<li>Menu the biggest one</li>
	<li>Other Menu</li>
	<li>Menu the biggest one</li>
	<li>Other Menu</li>
</ul>	
```    

#### Usage: 

`$(".menus-container").smartMenu(opts)`

#### Options:     

* `moreText`: the text that appears when some menus are collapsed. Defaults to "More"     

* `menuText`: the text that appears when all menus are collapsed. Defaults to "Menu"     

* `adjustOnResize`: if the plugin should adjust automaticly when the browser is resized. Defaults to true.


#### Methods:

* `smartMenu('init')`: Initialize the plugin. This is done when creating a new instance of SmartMenu

* `smartMenu('adjust')`: Invoke this when you need to adjust the menu to the container. It is usefull when the option `adjustOnResize` is false.

* `smartMenu('collapseAll')`: Collapse all the menus

* `smartMenu('destroy')`: Destroy this instance of SmartMenu.
