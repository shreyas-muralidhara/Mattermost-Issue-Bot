const got  = require('got');
const request = require('request');
var config ={}
config.token = process.env.GITTOKEN;
const urlRoot = "https://github.ncsu.edu/api/v3";
//https://api.github.com
async function getIssuesSince(owner, repo) {
	const urlval = urlRoot + "/repos/" + owner + "/" + repo + "/issues";
	const options = {
		method: 'GET',
		url: urlval,
		headers: {
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		},
		json: true
	};
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body)
		{
			if(error)
			{
				console.log(error);
				reject(error);
				return; //Terminate execution
			}

			resolve( body );

		});
	});
}

async function EditIssue(owner,repo,issueNumber,assignees) {
  const url = urlRoot + "/repos/" + owner + "/" + repo + "/issues/"+issueNumber;
  const postbody = {
  "assignees": [assignees]
    };
  const options = {
		method: 'PATCH',
		headers: {
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		},
    body: JSON.stringify(postbody)
	};
	// Send a http request to url
	let issues = (await got(url, options)).body;
	return issues;
}

async function EditIssueMileStone(owner,repo,issueNumber,mileid) {
	const url = urlRoot + "/repos/" + owner + "/" + repo + "/issues/"+issueNumber;
	const postbody = {
	"milestone": mileid
	  };
	const options = {
		  method: 'PATCH',
		  headers: {
			  "content-type": "application/json",
			  "Authorization": `token ${config.token}`
		  },
	  body: JSON.stringify(postbody)
	  };
	  // Send a http request to url
	  let issues = (await got(url, options)).body;
	  return issues;
  }

async function EditIssueLabel(owner,repo,issueNumber,labellist) {
	const url = urlRoot + "/repos/" + owner + "/" + repo + "/issues/"+issueNumber;
	const postbody = {
	"labels": labellist
	  };
	const options = {
		  method: 'PATCH',
		  headers: {
			  "content-type": "application/json",
			  "Authorization": `token ${config.token}`
		  },
	  body: JSON.stringify(postbody)
	  };
	  // Send a http request to url
	  let issues = (await got(url, options)).body;
	  return issues;
  }

async function getCollaborators(owner,repo){
  const url = urlRoot + "/repos/" + owner + "/" + repo + "/collaborators";
	const options = {
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		},
		json: true
	};
	try{
		let collaborators = (await got(url, options)).body;
		return collaborators;
	}catch(error){
		console.log(error.response.body);
	}
}
async function getIssueswithState(owner,repo,state,assignee){
  const url = urlRoot + "/repos/" + owner + "/" + repo + "/issues?state="+state+"&assignee="+assignee;
	const options = {
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		},
		json: true
	};
	try{
		let issues = (await got(url, options)).body;
		return issues;
	}catch(error){
		return [];
		console.log(error.response.body);
	}
}
async function getMilestone(owner,repo){
  const url = urlRoot + "/repos/" + owner + "/" + repo + "/milestones";
  const options = {
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		},
		json: true
	};
  // send a http request to urlRoot
	try{
		let milestones = (await got(url,options)).body;
		return milestones;
	}catch(error){
		console.log(error.response.body);
		return null;
	}
}
async function createIssue(owner, repo, createissue){

	//const url = urlRoot + "/repos/" + owner + "/" + repo + "/issues/";
	var options = {
	method: 'POST',
	url: 'https://api.github.ncsu.edu/repos/'+owner+'/'+repo+'/issues',
	headers: {
	      'User-Agent': 'CSC510-REST-WORKSHOP',
        'cache-control': 'no-cache',
        'Authorization': `token ${config.token}`,
        'content-type': 'application/json'
	},
	body: JSON.stringify(createissue)
	};

	return new Promise(function(resolve, reject)
	{
	 	request(options, function(error, response, body)
		{
			if (error)
			{
				console.log(error);
				reject(error);
				return;
			}
			obj = JSON.parse(body);
			resolve(obj);
			});
		});
}

exports.createIssue = createIssue;
exports.getMilestone = getMilestone;
exports.getIssueswithState = getIssueswithState;
exports.getCollaborators = getCollaborators;
exports.getIssuesSince = getIssuesSince;
exports.EditIssue = EditIssue;
exports.EditIssueMileStone = EditIssueMileStone;
exports.EditIssueLabel = EditIssueLabel;
