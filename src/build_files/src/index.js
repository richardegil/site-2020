import 'gsap';
import 'gsap/EasePack';
import 'gsap/EaselPlugin';
import "./styles.scss";
import "@iconfu/svg-inject";



// Tabs
const tabs = document.querySelectorAll('.block__tab a');
for (var i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener('click', function (e) {
        e.preventDefault();
        const event_target = e.target;
        const target = e.target.getAttribute('href');
        const tab_group = event_target.closest('.block--tabs').getAttribute('id');
        console.log(tab_group);

        document.querySelector('#' + tab_group + ' .block__tab.active').classList.remove('active');
        document.querySelector('#' + tab_group + ' .block__pane.active').classList.remove('active');
        event_target.parentElement.classList.add('active');
        document.querySelector('#' + tab_group + ' .block__pane' + target).classList.add('active');
	});
}

SVGInject(document.querySelectorAll("img.svg"));

// ACCORDIONS
const accordions = document.querySelectorAll('.block__accordion-tab');
for (var i = 0; i < accordions.length; i++) {
  accordions[i].addEventListener('click', function(e) {
    e.preventDefault;
    const parent = e.target.parentElement;
    const child = e.target.closest("span");

    parent.classList.toggle('active');
    child.classList.toggle("open");
  })
};
