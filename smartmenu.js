;(function($, window) {

	var pluginName = 'smartMenu',
		document = window.document;

	var _$menuContainer,
			_$menus;

	var defaults = {
		moreText:"More",
		menuText: "Menu",
		adjustOnResize: true
	};

	var _buildMenu = function(subMenus, menuText) {
		var $newMenu = subMenus[0].clone().addClass("smart-menu")
		.html("<a href='#' class='smart-menu-link'>" + menuText + "</a><ul style='display:none' class='sub-menus'></ul>"),
		$menuList = $(".sub-menus", $newMenu);

		$menuList.append(subMenus);
		_$menuContainer.append($newMenu);
	};

	var _resetState = function() {
		var subMenus = $(".sub-menus", _$menuContainer).
		children("li").
		detach();

		_$menuContainer.find(".smart-menu").remove();
		_$menuContainer.append(subMenus);
	};

	// The actual plugin constructor
	function Plugin(el, opts) {
		this.element = el;

		this.options = $.extend({}, defaults, opts) ;
		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	};

	Plugin.prototype = {
		// Plugin initialization
		init: function () {
			var _this = this;

			_$menuContainer = $(this.element);
			_$menus = _$menuContainer.children("li");

	         // bind the events
	         _$menuContainer.on("click.smartmenu", ".smart-menu-link", function(){
	         	$(this).next().toggle();
	         });

	         if(this.options.adjustOnResize){
	         	$(window).on('resize.smartmenu', function(){
	         		_this.adjust();
	         	});

	         	this.adjust();
	         }
	     },
		// unbind the events and 
		// return to the normal state
		destroy: function (){
			var _this = this;

			_$menuContainer.off("click.smartmenu");
			$(window).off('resize.smartmenu');

			_resetState();
		},

		adjust: function (){
			var containerWidth = _$menuContainer.width() - 66,
			totalMenus = _$menus.length;
			breakingMenus = [],
			menusTotalWith = 0;

			_resetState();

			_$menus.each(function(idx, el) {
				var menu = $(el);

				menusTotalWith += menu.outerWidth(true);

				if (menusTotalWith > containerWidth) {
					breakingMenus.push(menu.detach());
				}
			});

			if (breakingMenus.length > 0) {
	            // Removing last menu to get more room for the special menu
	            breakingMenus.unshift(_$menuContainer.children("li").last().detach());

	            _buildMenu(
	            	breakingMenus, 
	            	totalMenus !== breakingMenus.length ? this.options.moreText : this.options.menuText
            	);
	        }	
	    },

	    collapseAll: function (){
	    	var breakingMenus = [];

	    	_resetState();

	    	_$menus.each(function(idx, el) {
	    		breakingMenus.push($(el).detach());
	    	});

	    	_buildMenu(breakingMenus, this.options.menuText );
	    }
	};

	$.fn[pluginName] = function (options) {
		if (typeof arguments[0] === 'string') {

			var methodName = arguments[0],
				args = Array.prototype.slice.call(arguments, 1),
				returnVal;

			this.each(function() {
				var pluginInstance = $.data(this, 'plugin_' + pluginName);

				if (pluginInstance && typeof pluginInstance[methodName] === 'function') {
					returnVal = pluginInstance[methodName].apply(pluginInstance, args);
				} else {
					throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
				}
			});

			if (returnVal !== undefined){
				return returnVal;

			} else {
				return this;
			}

		} else if (typeof options === "object" || !options) {
			return this.each(function() {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		}

		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new smartMenu(this, options));
			}
		});
	}

}(jQuery, window));
