import Reveal from "../dist/reveal.esm.js";
import Zoom from "../plugin/zoom/zoom.esm.js";
import Notes from "../plugin/notes/notes.esm.js";
import Search from "../plugin/search/search.esm.js";
import Markdown from "../plugin/markdown/markdown.esm.js";
import Highlight from "../plugin/highlight/highlight.esm.js";

// Also available as an ES module, see:
// https://revealjs.com/initialization/
Reveal.initialize({
	hash: true,
	fragmentInURL: false,

	// Learn about plugins: https://revealjs.com/plugins/
	plugins: [ Zoom, Notes, Search, Markdown, Highlight ]
});
