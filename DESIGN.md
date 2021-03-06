# Design Milestone 

In this milestone, we are providing a design proposal for Software Engineering **Issue Bot**. Our design proposal will include description for the following items: 

## Problem Statement:
Github is the most popular version control used in Software development lifecycle management.
Issue tracking and management is the most common feature, which is used by software engineers on github platform.
Software Engineers have to perform daily tasks of tracking and maintaining issues, by subscribing to emails and web notifications related to their work repositories.
The implementation of the issue bots should overcome these mundane tasks for the users in issue management lifecycle.
Users interact with the bot in simple phrases, where the user directs specific task to the bot.
Bot triggers the required commands at the backend. This avoids the user to periodically visit github for the follow up of each notification.
The user should have the independence of letting the bot know on what notification he wants to receive. 
## Bot Description:
The Issue Bot is an easy to use bot that helps users in issue maintenance tasks such as:  
* **Priority ordering of Issues based on milestone and labels.**   
  Issues on github are handled by assigning multiple labels. But when there are many issues, then collaborator needs to figure out which one takes the priority. Manually processing issues based on labels is easier for a short list. This is not the case in most repositories that are open to community of developers. This is where issue bot comes to the rescue by prioritizing the issues and tracking them periodically.  
  Bot takes into consideration the time of creation,label attributes- type, priority and status. Then generates a priority rank for this set of attributes. It also allows frequent update of attributes, as issue progresses across various phrases of resolution.
* **Escalate stale issues to other team members.**  
  The Bot will notify the owner of the issue about stale issues by sending a direct message . The owner of the issue can then reassign the stale issue to some other team members.
* **Agile planning with Github Issues.**  
  Based on an individual's skill and experience, each team member can resolve the issues accordingly in a sprint. Agile manager needs to estimate the effort required for completion of issue before sprint. Our issue bot can abate the task of Agile manager and help in making an informed decision, by displaying the existing workload for each member.           
  At backend, Bot assigns level of difficulty-hard, medium, easy. It then calculates **performance metric** for each team member, based on the weighted average of issues completed in past 2 sprints. Additionally, bot computes **workload metric** by member based on his weight of both existing incomplete issues and the new issue. Bot displays the potential team members who can work on issue, only if their performance metric is greater than their existing workload metric.

Bridging the gap between github and mattermost would make project management more efficient. Having these features in our bot helps enhance coordination within the team as a user can easily perform certain tasks from mattermost without having to use the git page and also it helps the developers avoid keeping track of the issues. 

Our Issue Bot is a response to events bot. Our bot falls into the category of chat- Dev Bot since, it acts as a mediator between the people  by sending notifications.

## Use Cases
```
USECASE 1: Priority ordering of Issues based on milestone and labels.
1. Pre-conditions:
   The bot needs to be subscribed to the repository. If it is a Private repo the user should be a collaborator/owner of the Repository.
   For all existing open issues, the attribute labels- issuetype, issuepriority and issuestatus needs to be specified.
2. Main Flow: 
   When user requests for open issues, the bot displays the issues in prioritised order based on the label attributes and also allows the user to change the label attributes. 
3. Subflows:
   [S1]- The user would request open issues in the repository.
   [S2]- The bot will get the issues and determine its sentimental score based on the label attributes.  
   [S3]- The bot then displays the issues based on the priority. If the labels are missing, it assigns a default priority and displays it at the end of the list.
   [S4]- The user can request to update the attributes of a specific issue. 
4. Alternative Flow: 
   [E1]- If the labels for an issue are missing then sentimental score cannot be generated.
   ```
 ```  
USECASE 2: Escalate stale issues to other team members.
1. Pre-conditions:
   The bot needs to have the access to the repository. There must be some issues existing in the repository. 
2. Main Flow:
    The Bot will notify the owner of the issue about stale issues by sending a direct message . The owner of the issue can then reassign the stale issue to some other team members.
3. Subflows:
   [S1] Bot will notify the owner of the stale issues.  
   [S2] If some member has unsubscribed from the issue, he will not be notified.  
   [S3] The author can then reassign the stale issue to some other team members.  
4. Alternative Flows:
   [E1] The user will receive alerts only if there are stale issues.
 ``` 

```
USECASE 3: Agile planning with Github Issues.
1. Pre-conditions: 
   The bot needs to be subscribed to the repository. If it is a Private repo the user should be a collaborator/owner of the Repository.
2. Main Flow: 
   Whenever a new issue is created, the bot assigns a tag to the issue viz. easy, medium and difficult. The bot then calculates performance metric for each team member, based on the weighted average of issues completed in past 2 sprints. Then it computes workload metric per team member based on his weight of both existing incomplete issues and the new issue. The bot will then display the potential team members who can work on the issue, only if their performance metric is greater than existing workload metric.
3. Subflows: 
   [S1]- When a new issue is created, the bot assigns a tag to the issue viz. easy, medium and difficult. 
   [S2]- The bot then calculates performance metric for each team member, based on the weighted average of issues completed in past 2 sprints. 
   [S3]- Then it computes workload metric per team member based on his weight of both existing incomplete issues and the new issue.
   [S4]- The bot will then display the potential team members who can work on the issue, only if their performance metric is greater than existing workload.
4. Alternative Flow: 
   [E1]- If the labels for an issue are missing then agile planning cannot be done.
```



  
## Design Sketches

#### Wireframes
The following screens display the mock up of **issue bot**, for each of the use case:

* Priority ordering of Issues based on a sentimental score.
  ![usecase1](https://media.github.ncsu.edu/user/10687/files/5f824100-ebc4-11e9-84b4-465f000392dc)

* Stale issues alerts to all team members.
  ![wireframe3](https://media.github.ncsu.edu/user/10687/files/05ff2880-e167-11e9-9405-2a37fe9acf82)
	
* Agile planning with Github Issues.
  ![Use case 3](https://media.github.ncsu.edu/user/10687/files/0f842980-f217-11e9-8993-6dbe5a302c76)
  
#### Storyboard
   ![Storyboard](https://media.github.ncsu.edu/user/13106/files/8a645600-f377-11e9-99bd-8dee836b012a)


## Architecture Design

#### High Level Design

Below diagram displays the high level overview - Issue Bot:
![Image Pasted at 2019-9-27 17-35](https://media.github.ncsu.edu/user/10687/files/f1209600-e162-11e9-9e42-16e4dcd60418)


Our Issue bot interacts with following third party services:  
  GitHub  
  Mattermost  

Issue Bot would interact with users through its own Mattermost account.


#### Architectural Compnents

This project involves the usage of following components:  
![Image Pasted at 2019-10-22 21-32](https://media.github.ncsu.edu/user/10687/files/86216f80-f514-11e9-8ea6-f8dfa3b96409)

**Github**- GitHub provides hosting for software development version control using Git.  It provides access control and several collaboration features such as bug tracking, feature requests, task management, and wikis for every project.  Our bot is going to communicate with Github using Github REST API calls.  
**Mattermost**- Mattermost is an open-source, self-hostable online chat service. It is designed as an internal chat for organisations and companies. We will be deploying our bot on Mattermost.  
**IssueBot**- Our IssueBot is going to be the central medium of communication between the user on mattermost and github. User will make requests to the bot on mattermost and the bot will act accordingly. Our bot helps automate the manual tasks for the user.  
**User**- User is going to communicate with the bot through Mattermost. User will request and get response for his activities.  
**Github API Manager**-  Git API Manager is responsible to connect GitHub with the bot. It interacts with GitHub via Rest APIs to accomplish tasks.  
**Mattermost API Manager**- Mattermost  API Manager helps IssueBot and users to communicate effectively. It is used to send and receive data between the Bot App server and users. Bot uses a separate id to communicate on Mattermost.  
**Parser**- When the user types the message we will use a regular expression to grab the intent of the message. In the future, we may add a semantic parser to get more information.  
**Event Manager**- Event manager controls the intervals at which the bot notifies the user of any periodic events or alerts.  
**Bot Engine**- We are using Node.js server as the engine. It comes with an http module that provides a set of functions and classes for building a HTTP server.  
**Sentimental Analyzer**-Text processing framework to analyse Natural Language. It is focused on classification and sentiment analysis of issue labels.

#### Constraints:  
* Issue Bot makes API calls to GitHub and Mattermost. Currently GitHub and Mattermost API are statically incorporated into the functions. Any changes made to the GitHub and Mattermost API will be need to be manually updated in the bot.  
* The Issue Bot can only use GitHub for version control.  
* Currently, the issue bot extracts data from user messages using regular expressions. This can be improved upon by integrating with natural language processing API’s to make the bot more robust.
* Issue Bot can only interact with one user at a time.
* The Issue Bot assumes that the user is working only on a single Repository. That is, all members of a team are working on a single project.

#### Additional Design Patterns
##### Blackboard:
Our Issue Bot can be designed using the Blackboard pattern. The Issue bot interacts with clients who act as knowledge sources and any request from the client will be processed by the issue bot which performs corresponding operation on Github.

![blackboard](https://media.github.ncsu.edu/user/10687/files/37c3bf80-e166-11e9-9b0b-c410ef1e7103)

##### Event Systems:
Our bot architecture facilitates both explicit and implicit invocation. As an example of implicit invocation, the bot keeps track of conversation on an issue for some time and ask the user if it can push the messages as comments to that issue in git. And as an example for explicit invocation the bot displays the list of pull requests when requested by the user.
