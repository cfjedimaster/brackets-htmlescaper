/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, Mustache */

define(function (require, exports, module) {
	'use strict';

	var
		panelHtml     = require("text!templates/panel.html");

	var Commands                = brackets.getModule("command/Commands"),
		CommandManager          = brackets.getModule("command/CommandManager"),
		EditorManager           = brackets.getModule("editor/EditorManager"),
		DocumentManager         = brackets.getModule("document/DocumentManager"),
		MainViewManager			= brackets.getModule("view/MainViewManager"),
		ExtensionUtils          = brackets.getModule("utils/ExtensionUtils"),
		Menus                   = brackets.getModule("command/Menus"),
		PanelManager            = brackets.getModule("view/PanelManager"),
		NativeApp               = brackets.getModule("utils/NativeApp"),
		AppInit                 = brackets.getModule("utils/AppInit");

	//commands
	var VIEW_HIDE_HTMLESCAPER = "htmlescaper.run";

	require('htmlescaper');

	var $textareaOutput;
	var $htmlescaper;

	function handleEscape() {
		console.log("run handleEscape");
		var text;

		var activePanelId = MainViewManager.getActivePaneId();
		var currentFile = MainViewManager.getCurrentlyViewedFile(activePanelId);
		if(!currentFile) {
			_handleShowPanel();
			return;
		}

		currentFile.read(function(err, text, stats) {
			console.log("callback for read");

			$htmlescaper.show();
			CommandManager.get(VIEW_HIDE_HTMLESCAPER).setChecked(true);

			var escapeText = HTMLEscaper.escape(text);
			$textareaOutput.val(escapeText);
		});

	}

	function _handleShowPanel() {
		
		if ($htmlescaper.css("display") === "none") {

			handleEscape();
            $(DocumentManager).on("documentSaved", handleEscape);
            $(MainViewManager).on("currentFileChange", handleEscape);

		} else {
			$htmlescaper.hide();
			CommandManager.get(VIEW_HIDE_HTMLESCAPER).setChecked(false);
			EditorManager.focusEditor();
            $(DocumentManager).off("documentSaved", handleEscape);
            $(MainViewManager).off("currentFileChange", handleEscape);
		}

		EditorManager.resizeEditor();
	}
	
	CommandManager.register("Show HTMLEscaper", VIEW_HIDE_HTMLESCAPER, _handleShowPanel);

	AppInit.appReady(function () {
		
		ExtensionUtils.loadStyleSheet(module, "htmlescaper-brackets.css");

		//add the HTML UI
		var $panel = $(Mustache.render(panelHtml));

		var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
		menu.addMenuItem(VIEW_HIDE_HTMLESCAPER, "", Menus.AFTER);

		$('.close', $panel).click(function () {
			CommandManager.execute(VIEW_HIDE_HTMLESCAPER);
		});


		// AppInit.htmlReady() has already executed before extensions are loaded
		// so, for now, we need to call this ourself
		PanelManager.createBottomPanel('camden.htmlescaper.panel', $panel, 200);

		$textareaOutput = $("#htmlescaper_output", $panel);
		$htmlescaper = $("#htmlescaper");

	});
	
	
});