{% extends "layout.html" %}

{% block nav %}
	<li class='pure-menu-item pure-menu-selected' data-for='home'><a class='pure-menu-link' href='#home'>Home</a></li>
	<li class='pure-menu-item' data-for='engagement'><a class='pure-menu-link' href='#engagement'>Engagement</a></li>
	<li class='pure-menu-item' data-for='description'><a class='pure-menu-link' href='#description'>In Their Words</a></li>
	<li class='pure-menu-item' data-for='directions'><a class='pure-menu-link' href='#directions'>Directions</a></li>
	<li class='pure-menu-item' data-for='hotels'><a class='pure-menu-link' href='#hotels'>Hotels</a></li>
	<li class='pure-menu-item' data-for='registry'><a class='pure-menu-link' href='#registry'>Gift Registry</a></li>
{% endblock %}

{% block articles %}
	{% include "articles/article-home.html" %}
	{% include "articles/article-engagement.html" %}
	{% include "articles/article-description.html" %}
	{% include "articles/article-directions.html" %}
	{% include "articles/article-hotels.html" %}
	{% include "articles/article-registry.html" %}
{% endblock %}