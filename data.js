var resume = {
	personal : {
		name       : 'Andrew Fountain',
		suburb     : 'Moonee Ponds VIC 3039',
		phone      : '0416 006 176',
		email      : 'founts24@gmail.com',
		github     : 'https://github.com/synthet1c',
		stackoverflow: 'http://stackoverflow.com/users/1733478/synthet1c',
		codepen: 'http://codepen.io/synthet1c/',
		description: 'A full stack developer, focused mainly on javascript and asynchronous engineering seeking new opportunities to develop my skills. I made this site as a way to show my skill level and my coding style, there is a combination of everything that I know in relation to Web Programming used in this site. Everything is 100% original excluding a couple of algorithms for easing. I would consider it over the top for production work, but for a portfolio I believe it will give you a good indication of where I\'m at. I\'m always excited to learn new things and share knowledge',
		attributes : [
			'Obsessed with clean code.',
			'Driven to simplify complex problems',
			'Always finding new and interesting ways reach a solutions.',
			'Always reading up on all the latest advances in coding standards.',
			'Currently developing a Node JS framework to really grok node.',
			'Learning all the time. all my spare time is spent coding... seriously',
			'Proficient in elegant javascript, HTML, CSS, sass, less.',
			'Can understand and use jQuery, Node, PHP, MySQL, MongoDB, DynamoDB.',
			'Played with Angular, famous, laravel, express, mongoose, backbone, bootstrap, foundation.',
			'Competent with Git.'
		]
	},
	languages: [
		{
			name: 'Javascript',
			level: 'Advanced',
			desc: 'I have spent most of my time developing in javascript and it has become like a second language to me. It had the lowest point of entry, but the more I learn the more I like about the possibilities that can be achieved with such a simple language. I have a solid understanding of classical, and functional programming concepts, and know the language fluently. When I started to play with Node, It gave me everything I needed to make javascript my focus for a language.',
			score: 8,
			time: 2
		},
		{
			name: 'PHP',
			level: 'Intermediate',
			desc: 'I understand basic native php dealing with the language itself, but still need to reference the documentation when using more specific api\'s, but have no issue reading technical documentation or stack overflow to solve problems that arise naturally when developing applications.',
			score: 4,
			time: .5
		},
		{
			name: 'html',
			level: 'Intermediate',
			desc: 'I know the differences between the new html5 elements, but still need some work on best practices regarding accessibility',
			score: 7,
			time: 1
		},
		{
			name: 'css',
			level: 'Intermediate',
			desc: 'I am good with css, I know what floating is, what positioning is, and generally need to reference the docs only sometimes. I need to work on the structure of my css and standardise to make it easier to work with',
			score: 6,
			time: 1
		},
		{
			name : 'MySQL',
			level: 'Beginner',
			desc : 'I understand MySQL at an intermediate level, If I am given a database I can make queries and join relations to output. To learn MySQL I made a little php framework with models that abstracts the queries into an active record type of system, this presented me with lots of different queries I need to understand to make the api usable and efficient. I am not confident in my ability to know how to solve difficult problems off the top of my head, but have the confidence and the experience to know where to look to solve issues that may arise.',
			score: 3,
			time : .5
		},
	],
	frameworks: [
		{
			name: 'jQuery',
			level: 'intermediate',
            language: 'javascript',
            url: 'jquery.com',
			desc: 'I use jQuery every day in my current job, but have never really looked at training in it. From my wealth of knowledge of vanilla javascript I can make assumptions to how the jQuery api works, but still need to look at the docs sometimes. Honestly as jQuery is such a large library it wouldn\'t be hard to surprise me with new functionality that\'s built into it',
			score: 4,
			time: 1
		},
		{
			name: 'Angular',
			level: 'familiar',
            language: 'javascript',
            url: 'angular.io',
			desc: 'I have built a site with angular when i was playing with it, this has made me familiar with it\'s concepts and how it runs, but would need further practice to fully understand this framework.',
			score: 3,
			time: .5
		},
		{
			name: 'laravel',
			level: 'familiar',
            language: 'php',
            url: 'laravel.io',
			desc: 'I played with laravel a lot when I was first learning php. To me it is the most efficient way to build a site from scratch. When I used laravel I was so impressed with it\'s api, I decided to make a clone to understand it\'s core',
			score: 3,
			time: .5
		},
		{
			name: 'Polymer',
			level: 'familiar',
            language: 'javascript',
            url: 'polymer.io',
			desc: 'I have played with Polymer enough to be able to be familiar with it, I really like how everything is contained within it\'s own html module neatly placed in the shadow dom template tags, and the open source community surrounding the framework is amazing. I am torn between Polymer and React. I think in the end Polymer will become standard so will keep my eye on the framework oot stay up to date with it\'s advances',
			score: 2,
			time: .25
		},
		{
			name: 'React',
			level: 'beginner',
            language: 'javascript',
            url: 'facebook.github.io/react/',
			descold: 'React is the new kid on the block, so i have had a look at the docs, and read some articles, I intend to set some time aside to learn more about it, but understand the concept of having a virtual DOM, what jsx does, although this is the main reason I have non dug deeper.',
			desc: 'React is the new kid on the block, I have done all the hello world stuff, read the source, understand the concept of having a virtual DOM managed in javascript to increase efficiency, what JSX does and how it compiles, but I\'m still tossing up between react and Polymer to devote more time to. At the moment React is winning due to the one way data flow and the functional nature of the framework.',
			score: 1,
			time: .125
		},
		{
			name    : 'Famous',
			level   : 'beginner',
			language: 'javascript',
			url     : 'famo.us',
			desc    : 'I awaited the arrival of famous for all that it promised in bridging the gap between mobile and desktop, as well as having an incredible physics engine behind the scenes. Unfortunately I have not had a lot of time with this framework since it\'s release.',
			score   : 1,
			time    : .25
		},
		{
			name: 'scss',
			level: 'intermediate',
            language: 'css',
            url: 'sass-lang.com',
			desc: 'I understand mixins, functions, nesting in scss. I have used these tools to create a mini css fromework that was mainly a dynamic grid and some nice mixins. I now use bourbon and neat for the same thing',
			score: 4,
			time: .5
		},
		{
			name: 'less',
			level: 'beginner',
            language: 'css',
            url: 'lesscss.org',
			desc: 'I have spent less time with the less preprocessor, however most of the masic concepts are transferable from scss. I like scss more due to it\'s more declaritive nature, but you can\'t beat the compile time of lessc',
			score: 3,
			time: .125

		}
	],
	books: [
		{
			title: 'Secrets of a Javascript Ninja',
			author: 'John Resig',
			url: 'https://www.manning.com/books/secrets-of-the-javascript-ninja',
			subject: 'Javascript',
			learnt: 'This book was the first that made an impact on me and made me excited about programming. this book is feature packed but the main things I took from it were chaining methods of an object, understanding prototype\'s, closures. modules and Regex'
		},
		{
			title: 'Learning JavaScript Design Patterns',
			author: 'Addy Osmani',
			url: 'http://addyosmani.com/resources/essentialjsdesignpatterns/book/',
			subject: 'Javascript Objects',
			learnt: 'When I read this book I had a solid foundation in basic Javascript, but this book opened up the a new world of using objects and classes'
		},
		{
			title: 'Javascript Allonge',
			author: 'Reg Braithwaite',
			url: 'https://leanpub.com/javascript-allonge/read',
			subject: 'Functional Javascript',
			learnt: 'This book changed the way I thought about javascript. This book is such a good introduction to functional javascript, that took be from a beginner to understanding currying, arrays, iterators, partial application, mixins & decorators.'
		},
		{
			title: 'Javascript Spessore',
			author: 'Reg Braithwaite',
			url: 'https://leanpub.com/javascript-spessore',
			subject: 'Javascript Objects',
			learnt: 'This is the follow on to allonge, that takes what was learnt in the previous book and applies the knowlege to classes.'
		}
	],
	blogs: [
		{
			title: 'nettuts (old)',
			url: 'http://nettuts.com'
		},
		{
			title  : 'laracasts',
			url: 'http://laracasts.com'
		},
		{
			title: 'scotch.io',
			url: 'http://scotch.io'
		},
		{
			title: 'html5rocks',
			url: 'http://www.html5rocks.com'
		},
		{
			title: 'addyosmani.com',
			url: 'http://addyosmani.com/'
		},
		{
			title: 'html5rocks',
			url: 'http://www.html5rocks.com'
		}

	],
	work     : [
		{
			company         : 'Bwired / Core dna',
			id              : 'bwired',
			url             : 'http://bwired.com.au',
			address         : 'Prahran, VIC, 3181',
			title           : 'Client Support',
			dates           : 'September 2014 - Current',
			responsibilities: [
				'Providing ongoing support to existing clients, resolving customer queries.',
				'Enhancing customer websites with new functionality.',
				'Ensuring quality standards are maintained.',
				'Refactoring existing code to comply with modern standards.',
				'Contributing to QA in a group setting, including quality assurance of colleagues code.',
				'Documenting functionality and providing training materials for clients.',
				'Quoting and scoping of website enhancements and micro projects.',
				'Training new recruits.'
			]
		},
		{
			company         : '24 Digital',
			id              : 'twenty4',
			url             : 'http://24digital.com.au',
			address         : 'Cremorne, VIC, 3121',
			title           : 'Intern',
			dates           : 'July 2014 - September 2014',
			responsibilities: [
				'Worked on new client projects.',
				'Built two websites using WordPress (one has since been upgraded).',
				'Created the nharchitecture.net website based on design specifications provided by the client.',
				'Created an image gallery plug-in to display images and video content, and asynchronously downloading images.',
				'Used Google Maps API to generate a custom-styled map.',
				'Migrated existing data to new website.',
				'Implemented ajax across the site to allow for dynamic components.',
				'Integrated social media widgets.',
				'Optimised the UX around image loading.',
				'Used responsive design best practices to cater for mobile and tablet.',
				'Integrated gravity forms.',
				'Built with advanced customer fields.'
			]
		},
		{
			company     : 'Commonwealth Bank',
			id: 'commonwealth',
			url         : 'http://www.commbank.com.au',
			address     : 'Melbourne, VIC 3000',
			title       : 'Customer Service Consultant',
			dates       : 'March 2011 - March 2013',
			responsibilities: [
				'Average of 90 calls answered per day.',
				'Average call time 4.08mins.',
				'Meeting required Quality Assurance targets.Responsibilities:',
				'Multi skilled in all different aspects of consumer banking e.g. Internet Banking, Telephone Banking, Retail Banking (savings accounts), Credit Cards, Variable Rate Home Loans, Term Deposits.',
				'Keeping up to date with ever changing information and practices.',
				'Following predetermined best practice procedures to ensure customers receive the most relevant information.',
				'Liaise with different internal departments to ensure customer\'s needs are met.',
				'Recognise sales opportunities and refer the customer to the sales team.',
				'Working as part of a large team to collectively meet targets.',
				'Upholding Commonwealth Bank\'s code of ethics and conduct while dealing with customers and colleagues and to remain compliant with government regulation.'
			]
		},
		{
			company     : 'ANZ Bank, ACC, Melbourne, VIC',
			id: 'anz',
			url         : 'http://anz.com',
			title       : 'Customer Service Consultant',
			dates       : 'June 2010 - March 2011',
			responsibilities: [
				'Average of 170 calls answered per day.',
				'Average call time 1.58mins.',
				'Meeting required Quality Assurance targets.',
				'Maintaining highest possible score on internal Customer Satisfaction Survey.Responsibilities:',
				'Multi skilled in all different aspects of consumer banking e.g. Internet Banking, Telephone Banking, Retail Banking (savings accounts), Credit Cards, Variable Rate Home Loans, Term Deposits, Esanda Term Deposits, Aussie Credit Cards.',
				'Keeping up to date with ever changing information and practices.',
				'Following predetermined best practice procedures to ensure customers receive the most relevant information, ensuring ANZ has one voice when talking to customers.',
				'Liaise with different internal departments of the ANZ to ensure customer\'s needs are met.',
				'Recognise sales opportunities and refer the customer to the sales team.',
				'Working as part of a large team to collectively meet targets.',
				'Upholding ANZ\'s code of ethics and conduct while dealing with customers and colleagues and to remain compliant with government regulation.'
			]
		},
		{
			company     : 'Hobsons Australia',
			id: 'hobsons',
			url         : 'http://www.hobsons.com/apac',
			address     : 'Melbourne, VIC 3000',
			title       : 'Account Manager',
			dates       : 'June 2009 - June 2010',
			responsibilities: [
				'Average of 920 calls answered per month, up to 1,250 calls in peak periods.',
				'Average call time 3.20mins.',
				'Average 90 outbound calls per month.',
				'Average 690 emails per month.',
				'Completed Time Management Training with team members to learn to effectively manage high volumes of work.',
				'Proficient in the use of the Microsoft Office suite.Responsibilities:',
				'Managed enquiries from prospective Domestic and International students for top Australian education institutions.',
				'Handled enquiries across educational sectors for Undergraduate, Postgraduate and TAFE courses.',
				'Responded to enquiries and counseled prospective students by phone and email.',
				'Liaised with school administration, admissions staff, lecturers, education agents and Government bodies (e.g. DEEWR and VTAC) to ensure I could provide the most up to date relevant information to students.',
				'Worked in a team, assisting fellow members with their respective accounts to manage workload effectively and meet our contractual obligations to clients.'
			]
		}
	],
	education: [
		{
			institution: 'Swinburne University of Technology',
			course     : 'Diploma of Digital Media/Website Development',
            learnt     : 'After deciding to take programming seriously, and having already experienced to University, I chose to go to TAFE as I prefer to learn something then create something with the new found knowledge.',
			dates      : '2013 - 2014'
		},
		{
			institution: 'La Trobe University, Bundoora',
			course     : 'Bachelor of Biological Sciences',
            learnt     : 'I learnt that I love tackling and understanding complex problems, and I need to live in both the theoretical and the tangible world. For me biology was too conceptual.',
			dates      : 'Started 2009 - Deferred'
		},
		{
			institution: 'Gordon Institute of TAFE',
			course     : 'Victorian Certificate of Education',
            learnt     : 'I never finished school when I was a teenager, instead I got a job at 15. I always wished I had finished school, so decided to go back and complete it as a mature student. I learn\'t that I can challenge my own pre-conceived notions of myself and re-invent my life.',
			dates      : '2008'
		}
	],
	referees : [
		{
			name   : 'Matthew White',
			title  : 'Team Leader',
			company: 'Bwired',
			phone  : '',
			email  : ''
		},
		{
			name   : 'alisha Bartl',
			title  : 'Director, Global Projects',
			company: 'Hobsons Australia',
			phone  : '0407 667 675',
			email  : ''
		}
	]
};