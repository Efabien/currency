module.exports= {
 	keyWords:{
 		'money':{
 			'USD':[['dollar'],['dollar','américain']],
 			'SGD':[['dollar','de','singapour']],
 			'EUR':[['euro'],['eur']],
      'GBP':[['livre'],[ 'livre','streling']],
      'CHF':[['franc','suisse']],
      'JPY':[['yen']],
      'CAD':[['dollar','canadien']],
      'XDR':[['droits','de','tirage','spéciaux','du','FMI']]
 		},
 		'action':{
 			'licenceBadjage':[['licence','de','badjage'],['licence','badjage'],['papiers','de','badjage']]
 		},
 		'theme':{
 			'économie':[['économie'],['économique'],['finance'],['éco']],
 			'politique':[['politique']],
 			'sport':[['sport']],
      'actualité':[['actu'],['actualité'],['internationnale']]
 		}
 	},
 	intents:{
 		'greating':{
 			'texts':['bonjour','salut','hello','yo','hey','hi','bonjour bot','coucou','salutation'],
      'pondered':['bonjour','salut','hello']
 		},
    'thks':{
      'texts':['merci foo','je te remercie','super foo','thanks foo'],
      'pondered':['merci']
    },
 		'ask_value':{
 			'texts':['combien vaut ','Donne moi la valeure du','quelle est la valeure','quelle est le taux','a combien est '],
 			'pondered':['valeure','taux','vaut'],
      'required':'money'
 		},
 		'ask_proccess':{
 			'texts':['comment fait t on pour faire ?','qu est ce qu on doit faire pour ?','quelle est la marche à suivre pour','qu est ce que je dois faire pour',
 			'quelle est la procédure pour'],
 			'pondered':['procédure','démarche']
 		},
 		'general_inquery':{
 			'texts':['je voudrais avoir une information','peux tu m aider','tu pourrais me fournir une information ?','je souhaiterai demander quelque chose'],
 			'exclude':['ask_news']
 		},
 		'ask_news':{
 			'texts':['Quelles sont les dernière nouvelles sur','Donne moi des news','que se passe t il en ','je voudrais avoir les nouvelles sur'],
 			'exclude':['general_inquery'],
 			'pondered':['news','nouvelles','info','information'],
      'required':'theme'
 		}
 	}
 }