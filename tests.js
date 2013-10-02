QUnit.testStart(function () {

});

test("HTMLEscaper should replace Quotes", function() {
    strictEqual(HTMLEscaper.escape("'"), '&#x27;', "Should replace ' with &apos;");
    strictEqual(HTMLEscaper.escape('"'), '&quot;', 'Should replace " with &quot;');
});

test("HTMLEscaper should replace Ampersands", function(){
    strictEqual(HTMLEscaper.escape("&"), "&amp;", "Should repalce & with &amp;");
});

test("HTMLEscaper should replace Greater Than", function(){
    strictEqual(HTMLEscaper.escape(">"), "&gt;", "Should repalce > with &gt;");
});

test("HTMLEscaper should replace Less Than", function(){
    strictEqual(HTMLEscaper.escape("<"), "&lt;", "Should repalce < with &lt;");
});

test("HTMLEscaper should replace front slash", function(){
    strictEqual(HTMLEscaper.escape("/"), "&#x2F;", "Should repalce / with &#x2F;");
});

test("Test Everything", function() {
   testString = "<h1>This is a test & it" + "'" + 's awesome</h1><span="test"></span>';
   strictEqual(HTMLEscaper.escape(testString), "&lt;h1&gt;This is a test &amp; it&#x27;s awesome&lt;&#x2F;h1&gt;&lt;span=\&quot;test\&quot;&gt;&lt;&#x2F;span&gt;", "Testing Esacping of simple HTML values together");
});