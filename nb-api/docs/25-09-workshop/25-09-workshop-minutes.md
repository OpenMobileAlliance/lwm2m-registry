LwM2M Northbound API Workshop
25th Sept 
Attendance:
    - Matt (Itron)
    - Jaime (Ericcson) 
    - Jean (T-Mobile)
    - Travis (Itron)
    - Joaquin (OMA staff)
    - Will (Aetheros)
    - Alexandre (Hydro Quebec)
    - Ari (Ericcson) 
    - Colin (Nokia)
    - David (Ioterop)
    - Elias Weingaertner  (Cumulocity Iot)
    - Jan (Ericcson) 
    - Lyle Bertz (T-mobile)
    - Mojan
    - Murat (T-mobile)
    - Olivier (Ioterop)
    - Ozge Akin (Cumulocity Iot)
    - Poornima Magedeven (T-Mobile)
    - Rajat (Ericcson) 
    - Sylvain Riendeau  (Hydro Quebec)
    - Tommy (T-Moble)
    - Nitin

Agenda:

DMSO NB API
Jaime introduced the topic. The task is to define the scope and the contents of the API.
ETSI has developed Northbound API but it was not successfull. 
How can we make this task inside of OMA successful?
Suggestions:
Focus on our scope rather than try to identify competitive advantages.

Web APIs 101
Introductioion to APIs:
What is an API
Expose functionality
Your client application will interact with the API
REST
State trasnfer and operations over resources
Resources = URLs
Real Time Data
Webhook = URL to the server, the client receives notifications from the API
Authentication & Authorization
Parties need to be identified 
OpenAPI (default standards)
YAML File (methods, resource paths, respond codes, errors, etc)
Swagger is a well-known editor
Test harness
Suggestion to use API to automate test cases

API usage scenarios
Scenarios
Ecosystem Aggregator
Company Y reachs to other Ecosystems via NB APIx
Interacts with various ecosystems through APIs
The Hyperscale Cloud Provider (HCP)
Different compaines to reach the same LwM2M Ecosystem
System Integrator
One company integrates to multiple vendors via the NB API x
The Application Developer via WG
My App reachs different devices (NB API) via a common Gateway (LwM2M)
The Application Developer Directly
My App reaches to different devices via a NB API

CAMARA
https://camaraproject.org/
Open source project
Lyle Bertz (T-MOBILE US)
Governing board of Camara
Scope
ISP APIs
Volunteer org as Linux Foundaiton project.
Break down API in three ways:
Service API
Service management APIS
Camara API consumer
Developing on the Server side
Linux Foundation project
Willing to host APIs but not necessarily operate on that
Provide support tools, hosting, etc.
Has some costs.
Telco APIs E/W APIs 
Service API exposed to consumer and the focus
Southbound APIs
Operators have the right to differenciate
Hide complexity of telco and expose telco APIs.
What is exposed: network capabilities (QoS, IDM, slicing, positioning...)
Interoperability: API roaming
Other fora: tmf, gmsa.
tmf requires some telco knowledge, tmf is not apparently aggregating api
gsma is telco oriented and has some level of aggregation

MG: How would lwm2m fit in this architecture
LB: in a couple of slides.
LB: They can host projects, tmf and gsma have non-voting membership. 
TMF and GSMA help to identify overlasp and problems with existing interfaces and give visibility to Camara project.
 * Different ways to build a new API with Camara
* Where do you want to go?
* The best thing is to get involve. Just need to get into GitHub and particpate (not need to be a member)
* Examples of APIs:
    * Edge Cloud API
    * Quality on Demand
    * Device Status

MG: Interested on SIM Swap APIs and whether they are already implemented APIs in CAMARA.
LB: Everything available in camara repo.
MG: Interest in bringing lwm2m there?
LB: We are contribution driven. No specific target of bringing lwm2m there.

RK: Camara is working more towards network technologies. How do we see lwm2m, is it a network tech or do we see it as something higher. For example you can get device status API with LwM2M but you could also get it with the Network API.

OneM2M
- Overview by Will Bell (Aethereos)
- https://onem2m.org
- Why consider oneM2M (to host the LwM2M API)?
- Mature, well documented, ideal for iot device management
- API considerations are complex (design patterns, object model, transport bindings, security...)
- OneM2M APIs has transport bindings defined, for HTTP (cloud), CoAP (endpoints) and MQTT.

JJ: When you say a northbound API API that exposes resources over CoAP, what is that? is it like a RD?
WB: towards the northbound is HTTP mostly, but you could also implement over CoAP.
MG: Do you use Oscore?

CG Colin Grealish: Complex standard, not particularly successful. 
WB: (someone please help, I could not catch this)

- They are using LwM2M on the wire. They abstract LwM2M there, similar to what we want to do.
- LwM2M Objects mapping to mgmtObjs
- LwM2M Resources mapping to objAttr

CG: the OneM2M LWM2M interworking specification: https://www.onem2m.org/images/files/deliverables/Release3/TS-0014-LWM2M_Interworking-V3_1_1.pdf

Open Discussion

MG: Focus on an API that maps more closely to LwM2M. LwM2M API resources should be part of the core API. 

DN: Level of abstraction, do we want an API that gives you the location of the API (high) or object level 6 (low). How close to the LwM2M objects? Service APIs? I agree with Colin, for this APIs as a LwM2M server vendor, we need to see some room for specific added value for the vendor, so that we can differenciate. 

Will Bell: Vendor specific differenciation is important.

JJ: Clarify that that's not the current DMSO position. We could leave room for differenciation.

WB: If a spec is thorough is a good thing, however it may not cover every use case, so there is room for differenciation. It does not invalidate interoperability.

DN: level of abstraction?

MG: All core enablers as standardized APIs. Focus on lower level APIs.

WB: Agree that the core enables as direct mappings as opposed to higher-layer abstractions. If we have the core enablers that'd be a lot of progress for this group.

Elias Weingaertner (EW): We have an IoT Platform, we offer LwM2M but also other functionalities. So agrees with DN on the importance of the level of abstraction. If there is a low-level API, this would be valuable but keep in mind that people choose this services also due to other features, not just lwm2m.

WB: Agrees on the interoperability area. Our customers wants interoperability and useful products.

Travis: Basic operations should not look much different, it should be consistant for the app developers in the cloud, json, url patterns, etc... consistancy that we are looking for. We are looking for very basic interoperability.

RK: MG you mentioned core enablers and URI structures. Could you give a couple of examples?
MG: LwM2M 1.2 objects exposed over HTTP API. Interface with those objects. Another example would be the CC and have an API to it.

WB: We need to consider how do we address groups...
MG: Composite objects.

RK: LwM2M can be a technical system with capabilities. We lack APIs toward LwM2M systems. From an application dev you could do the same. Another would be exposing services (get location, etc), do we look into higher layer of abstraction (location) or lower layers (high, medium, low)?

MM: Advice leave higher layer of abstraction for later. This higher layer applications would not be interested in whether u use lwm2m or something else. NB API would need to understand lwm2m system and leave services for later on.

MG: common basic resources would be better at this point. URI somewhat mapping to lwm2m objects.

Jaime (co-chair hat): Consensus seems to be for a lower layer API that maps to lwm2m, that allows for extensibility for lwm2m server vendors. 

(rough consensus)
MM: Group, discovery...

RK: addressing MM comment. Applications will need filtering, discovery, etc. 
who is the target to use the APIs?

DN: I agree with Will and Rajat. For some people the lwm2m server was just a proxy. Registration, etc.. let's avoid that.

WB: Queue mode is more lwm2m specific, agrees with DN.

MG: Let's focus on the core services first. 

JJ: Seems to be some consensus.

Travis: handling of versioning needs ot be consistant. If we have someone submit a new object, we should be able to hand them an API structure that is addressable. This should be also part of the process. 

RK: Considerations/observations
- lwm2m is perceived as monolithic, do you think that how we package these APIs could help reduce that? OMA LwM2M object model might be complex too.
- would like to take into account CAMARA, for example for event handling and identifiers. Not as requirements but as comments.
MG: Separate objectives with common purpose. (increase adoption). Core API could start but in parallel could be the other work. Interoperability is the main objective.

RK: Agrees. 

EW: Likes the monolith comment. Comments on the API. There might be some API definitions that could be grouped together with features and independent versions. 

MG: a device registering announces via the API that there is a new device.

Travis: thanks Jaime for the preso and the use cases part.

JJ: summarizes the rough view TBD on the type of API, the possibility of various APIs, services APIs etc. 

DN: OMA workflow to create a repo for this work and inside a work item description doc with requirements (markdown) and PRs. Then we discuss this during the weekly call. 

MG: Common repo and common mailing list?

JT: no need for other mailing list. 

JJ: Sure repo not sure as mail. 

JJ: Group agrees to:
    - Consensus seems to be for an API that maps to lwm2m, that allows for extensibility for lwm2m server vendors. 
    - More APIs -service oriented- are also in scope.
    - Schedule work sessions to progress the work
    - Set up a Repo for this work
