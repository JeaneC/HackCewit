// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
var score1 = document.querySelector('#score1');
var score2 = document.querySelector('#score2');
var score3 = document.querySelector('#score3');
var bar = new ProgressBar.Circle(score1, {
	color: '#28EBD2',
	trailColor: '#eee',
	trailWidth: 5,
	duration: 1400,
	easing: 'bounce',
	strokeWidth: 9,
	from: { color: '#28EBD2', a: 0 },
	to: { color: '#00C1C1', a: 0.9 },
	// Set default step function for all animate calls
	step: function(state, circle) {
		circle.path.setAttribute('stroke', state.color);
	}
});
var bar2 = new ProgressBar.Circle(score2, {
	color: '#FEE734',
	trailColor: '#eee',
	trailWidth: 1,
	duration: 1400,
	easing: 'bounce',
	strokeWidth: 9,
	from: { color: '#28EBD2', a: 0 },
	to: { color: '#FEE734', a: 1 },
	// Set default step function for all animate calls
	step: function(state, circle) {
		circle.path.setAttribute('stroke', state.color);
	}
});
var bar3 = new ProgressBar.Circle(score3, {
	color: '#FA1474',
	trailColor: '#eee',
	trailWidth: 1,
	duration: 1400,
	easing: 'bounce',
	strokeWidth: 9,
	from: { color: '#28EBD2', a: 0 },
	to: { color: '#FA1474', a: 1 },
	// Set default step function for all animate calls
	step: function(state, circle) {
		circle.path.setAttribute('stroke', state.color);
	}
});

bar.animate(0.7); // Number from 0.0 to 1.0
bar2.animate(1.0); // Number from 0.0 to 1.0
bar3.animate(1.0); // Number from 0.0 to 1.0

barData = [7, 4, 6, 5, 6, 6, 9, 10, 14, 15, 14, 20, 16];

let chart2 = document.querySelector('.data2');
var myChart = new Chart(chart2, {
	type: 'bar',
	data: {
		labels: ['Push-Ups'],
		datasets: [
			{
				label: 'Reps Per Minute',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: ['#D806EA'],
				borderColor: ['#D806EA'],
				borderWidth: 1
			}
		]
	},
	options: {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true
					}
				}
			]
		}
	}
});

let data = {
	labels: [0, 5, 10, 15, 20, 25, 30, 35, 40],

	datasets: [
		{
			title: 'Reps Per Minute',
			values: [25, 20, 30, 35, 8, 32, 17, 4]
		}
	]
};

let chart = new Chart({
	parent: '#chart2', // or a DOM element
	data: data,
	type: 'bar', // or 'line', 'scatter', 'pie', 'percentage'
	height: 250,

	colors: ['#7cd6fd'],
	// hex-codes or these preset colors;
	// defaults (in order):
	// ['light-blue', 'blue', 'violet', 'red',
	// 'orange', 'yellow', 'green', 'light-green',
	// 'purple', 'magenta', 'grey', 'dark-grey']

	format_tooltip_x: d => (d + '').toUpperCase(),
	format_tooltip_y: d => d + ' pts'
});

//
// var container = document.querySelector('.container');
// container.addEventListener('click', function() {
// 	window.location = 'register.html';
// });
