var resume = {
	personal : {
		name       : 'Andrew Fountain',
		address    : '157 Pascoe Vale Road',
		suburb     : 'Moonee Ponds VIC 3039',
		phone      : '0416 006 176',
		email      : 'founts24@gmail.com',
		description: 'A full stack developer, focused mainly on javascript and asynchronous engineering seeking new opportunities to develop my skills. About me:',
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
			desc: 'I have spent most of my time developing in javascript. It had the lowest point of entry, but the more I learn the more I like about the possibilities that can be achieved with such a simple language. When I started to play with Node, It gave me everything I needed to make js my focus for a language.',
			score: 8,
			time: 2
		},
		{
			name: 'PHP',
			level: 'Intermediate',
			desc: 'I understand basic native php dealing with the language itself, but still need to reference the documetation when using newer api\'s',
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
		}
	],
	frameworks: [
		{
			name: 'jQuery',
			level: 'intermediate',
			desc: 'I use jQuery every day in my current job, but have never really looked at training in it. From my wealth of knowledge of vanilla javascript I can make assumptions to how the jQuery api works, but still need to look at the docs sometimes.',
			score: 4,
			time: 1
		},
		{
			name: 'Angular',
			level: 'familiar',
			desc: 'I have built a site with angular when i was playing with it, this has made me familiar with it\'s concepts and how it runs, but would need further practice to fully understand this framework.',
			score: 3,
			time: .5
		},
		{
			name: 'laravel',
			level: 'familiar',
			desc: 'I played with laravel a lot when I was first learning php. To me it is the most efficient way to build a site from scratch. When I used laravel I was so impressed with it\'s api, I decided to make a clone to understand it\'s core',
			score: 3,
			time: .5
		},
		{
			name: 'Polymer',
			level: 'familiar',
			desc: 'I have played with Polymer enough to be able to be familiar with it, however it has since been changed and released as a 1.0, so would need to look at it again to be confident',
			score: 2,
			time: .25
		},
		{
			name: 'Famous',
			level: 'beginner',
			desc: 'I awaited the arival of famous for all that it promised in bridging the gap between mobile and desktop, as well as having an incredible physics engine behind the scenes. Unfortunately I have not had a lot of time with this framework since it\'s release.',
			score: 1,
			time: .25
		},
		{
			name: 'React',
			level: 'beginner',
			desc: 'React is the new kid on the block, so i have had a look at the docs, and read some articles, I intend to set some time aside to learn more about it, but understand the concept of having a virtual DOM, and a templating language that is built into the js, althouht this is the main reason I have non dug deeper',
			score: 1,
			time: .125
		},
		{
			name: 'scss',
			level: 'intermediate',
			desc: 'I understand mixins, functions, nesting in scss. I have used these tools to create a mini css fromework that was mainly a dynamic grid and some nice mixins. I now use bourbon and neat for the same thing',
			score: 4,
			time: .5
		},
		{
			name: 'less',
			level: 'beginner',
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
			dates      : '2013 - 2014'
		},
		{
			institution: 'La Trobe University, Bundoora',
			course     : 'Bachelor of Biological Sciences',
			dates      : 'Started 2009 - Deferred'
		},
		{
			institution: 'Gordon Institute of TAFE',
			course     : 'Victorian Certificate of Education',
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