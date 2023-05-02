
    # Agenda and Meeting Minutes DMSE-04-25-2023

    [https://etherpad.openmobilealliance.org/p/Agenda\_and\_Minutes\_DMSE\_2023\_04\_25](https://etherpad.openmobilealliance.org/p/Agenda\_and\_Minutes\_DMSE\_2023\_04\_25)

All meeting minutes: [https://github.com/OpenMobileAlliance/dmse-wg/tree/master/minutes](https://github.com/OpenMobileAlliance/dmse-wg/tree/master/minutes)





Links: 

    All meeting minutes: [https://github.com/OpenMobileAlliance/dmse-wg/tree/master/minutes](https://github.com/OpenMobileAlliance/dmse-wg/tree/master/minutes)

    [https://github.com/OpenMobileAlliance/lwm2m-registry](https://github.com/OpenMobileAlliance/lwm2m-registry)

    [https://github.com/OpenMobileAlliance/dmse-wg](https://github.com/OpenMobileAlliance/dmse-wg)



    ## Participants

   * Matt
   * Joaquin
   * Gordana
   * Mateusz
   * Mojan
   * Jaime
   * Jean
   * Travis
   * Hamza Abbasi (Qualcomm)
   * Fred Rodermund (IoTECC)


    ## IPR Call

    

    "Each Member will use its reasonable endeavours to inform timely the Open Mobile Alliance of Essential IPR as it becomes aware that the Essential IPR is related to the prepared or published Specification. Members shall submit to the General Manager of Operations of OMA the IPR Statement and the IPR Licensing Declaration. These forms are available from OMA or online at the OMA website at www.openmobilealliance.org."

    

    ## OMA Antitrust Policy

    

    [http://www.openmobilealliance.org/AboutOMA/Antitrust.aspx](http://www.openmobilealliance.org/AboutOMA/Antitrust.aspx)

    

    ## OMA Guest \& Observer Policy

    [http://member.openmobilealliance.org/ftp/tp/gen\_info/guest.shtml](http://member.openmobilealliance.org/ftp/tp/gen\_info/guest.shtml)

    

    ## Review and Agree Previous Meeting Minutes

    

[https://github.com/OpenMobileAlliance/dmse-wg/blob/master/minutes/Agenda\_and\_Minutes\_DMSE\_2023\_04\_18.md](https://github.com/OpenMobileAlliance/dmse-wg/blob/master/minutes/Agenda\_and\_Minutes\_DMSE\_2023\_04\_18.md)

Group: No objections to approve



### Compact Composite Presentation from Rajat/Ari

   * 



   * MG: Commited DN's suggestion,  object does not pass validation
       * Action point: PR to 511 and 512, OIDs are reserved
       * MG: Sent an email to Ari and Rajat - Complete,  see PR#688 for more details
       * JH: Update coming soon
       * [https://github.com/OpenMobileAlliance/lwm2m-registry/pull/688](https://github.com/OpenMobileAlliance/lwm2m-registry/pull/688)
       * ACTION: MG \& JJ will take a look at resolving
   * 

### Update onproposed Merger of DMSE and IPSO WG's

   * DMSO-IoT charter has been approved by the board on 4/14/2023!
   * * **DMSE/IPSO meeting invite will be cancelled and new invitation will be created for DMSO-IoT**
   * 

   * New DMSO-IoT: [https://oma.groups.io/g/dmso-iot](https://oma.groups.io/g/dmso-iot) 
           * New Meeting Calendar (new invites)
           * New Files folder
   * GitHub
           * **ipso-wg repo archived.**
   * 

   * DMSE-WG Issues:  Group agrees to close all issues 20-24 on 4/25/2023
   * DMSE-WG PRs: moved to DMSE-IoT
   * lwm2m\_for\_developers: [https://github.com/OpenMobileAlliance/OMA\_LwM2M\_for\_Developers/issues](https://github.com/OpenMobileAlliance/OMA\_LwM2M\_for\_Developers/issues)
       * ACTION: Ping authors of existing issues to determine which are still relevant
   * 

### IETF 116 Updates / pertinent drafts

   * 

   * Working Group: core 
       * 

       * 1) draft-ietf-core-attacks-on-coap-02 - This draft discusses known attacks on CoAP deployments and highlights that just using security protocols like DTLS, TLS, or OSCORE isn't enough for secure operation. It shows how some of the discussed attacks can be mitigated with the solutions in RFC 9175. For LwM2M, which utilizes CoAP extensively, understanding and addressing these attacks is vital to ensure the security of device management operations. 
       * 

       * 2) **draft-ietf-core-conditional-attributes-06 **- This specification defines Conditional Notification and Control Attributes that work with CoAP Observe (RFC7641). LwM2M uses CoAP's observe feature,     making these definitions useful for device management operations involving observe. We have in fact defined most of the ones included in the current draft. 
           * ACTION: IETF is waiting for OMA feedback - Add to agenda 5/1/2023
       * 

       * 3) draft-ietf-core-dns-over-coap-02 - Defines a protocol for sending DNS messages over CoAP, enabling DNS message exchange for constrained devices in IoT networks. With LwM2M built on CoAP, this draft facilitates device management on networks with limited  resources. 
       * 

       * 4) draft-ietf-core-coap-pubsub-12 - This document describes a publish-subscribe architecture for CoAP,  extending its capabilities for supporting devices with long breaks in connectivity and/or up-time. In LwM2M, this is particularly significant as  it allows both Devices and Services to work efficiently in cases where continuous connectivity is not a viable option. V12 already partially implemented here [https://github.com/jaimejim/aiocoap-pubsub-broker](https://github.com/jaimejim/aiocoap-pubsub-broker) 
       * [https://datatracker.ietf.org/meeting/116/materials/slides-116-core-a-publish-subscribe-architecture-for-the-constrained-application-protocol-coap](https://datatracker.ietf.org/meeting/116/materials/slides-116-core-a-publish-subscribe-architecture-for-the-constrained-application-protocol-coap)
           * ACTION: Review this in the future


       * 5) draft-ietf-core-target-attr-04 - This draft introduces an IANA registry for target attribute names when used in Constrained RESTful Environments, allowing better coordination of these attributes in LwM2M deployments when working with Web Linking  features (RFC 8288) and related discovery protocols (RFC 6690).
       * 

   * Working Group: ace 
   * 

       * 6) draft-ietf-ace-pubsub-profile-06 – ACE profile for Pub/sub communication over CoAP. Future versions will include topic management and administration operations, currently focusing on communication security and server token-based authentication. 


       * 7) draft-ietf-ace-actors-07 - Provides terminology and identifies elements required for authentication     and authorization in constrained-node networks. A good understanding of these elements is necessary for implementing secure and efficient LwM2M  device management. 
       * 

       * 8) draft-ietf-ace-key-groupcomm-16 - Defines mechanisms for authorization in group communication scenarios using the ACE framework. Efficient group communication is relevant for LwM2M when managing multiple devices simultaneously. Might be out of scope for many use cases in DM.
   * 

   * Working Group: cbor
   *  
       * 9)draft-ietf-cbor-packed-08 - Specifies Packed CBOR, providing a compact representation of CBOR data  items for constrained environments. Since LwM2M often utilizes CBOR, this efficient representation may be useful for improved device management performance. 


       * 10) draft-ietf-cbor-time-tag-05 - Introduces CBOR tags for time, duration, and period, which can be     beneficial for LwM2M implementations where time-related data is managed across devices.
   *  


### GitHub working procedures

   * Action Point: Matt and Jaime to meet and start planning for this. 
   * Action Point: Joaquin to share link to validation tool log
   * Link to the page that contains all the repositories:
   * [https://docs.google.com/document/d/1SwIdvNwRNx8cmGojnd\_W35txQtLkBU9dDBL6c4IR\_Gc/edit?usp=sharing](https://docs.google.com/document/d/1SwIdvNwRNx8cmGojnd\_W35txQtLkBU9dDBL6c4IR\_Gc/edit?usp=sharing)
   * ACTION: MG sent an email to JJ to determine availability to discuss -- MG send an email 4/18/2023 
   * Joaquin: Presented [https://openmobilealliance.github.io/oma\_working\_groups/](https://openmobilealliance.github.io/oma\_working\_groups/)
   * JT: would it be better to link it to our github area?  my concern is alignment and duplication of work
   * 

### Issues \& PRs

   * 

   * [https://github.com/OpenMobileAlliance/lwm2m-registry](https://github.com/OpenMobileAlliance/lwm2m-registry)
   * 4 open issues
   * 

   * MG: Proposes to tag 3 of these issues as move to DMSO-IoT
   * 

   * Any tooling needs around LWM2M or Leshan ? Move to DMSO-IoT
   * #696 opened on Jan 26 by sbernard31 - MOVE
   * 

   * GSMA ESipa object Move to DMSO-IoT
   * #692 opened on Nov 22, 2022 by david-bohaty-thalesgroup
   * 3 of 6 tasks 
   * 

   * JSON representation of the lwm2m-registry Move to DMSO-IoT
   * #681 opened on Jul 19, 2022 by mkgillmore
   *  
   * 

   * Mateusz raised an issue with object 21 being 2.0 in lwm2m 1.2.1 and object 21 being 1.1 in lwm2m 1.2.  An issue will be created [https://github.com/OpenMobileAlliance/OMA\_LwM2M\_for\_Developers/issues/561](https://github.com/OpenMobileAlliance/OMA\_LwM2M\_for\_Developers/issues/561)
   * ACTION: MG to spend time on this.  Need a agreed upon approach to resolve this issue
   * MK: Damage has already been done as we broke backward compatability with 1.2 vs 1.2.1
   * MK: There is no issue if the client reports the version in the discovery/registration process
   * MK: This can be resolved by deciding on either object version 1.1 or 2.0 as the default for LwM2M 1.2 - I'm not sure which way we should go, but either reverting the change in 1.2.1 or effectively changing the original 1.2 spec would resolve the issue.
   * MM: If the object version does not reflect the CORE version,  the client SHALL report the version in use upon registration/discovery.
   * MK: Perhaps this can be addressed in 1.2.2?
   * 

   * #681 JSON representation of the OMA registry
   * 

   * [https://github.com/OpenMobileAlliance/lwm2m-registry/issues/681](https://github.com/OpenMobileAlliance/lwm2m-registry/issues/681)
   * MG, TS, JP and MK have interest on contributing
   * MG: ACTION to setup a separate meeting to discuss this topic and layout a work plan
   * MG: Adhoc meeting was held 4/17/2023 with the minutes here: 
       * [https://github.com/OpenMobileAlliance/dmse-wg/blob/master/minutes/Agenda\_and\_Minutes\_DMSE\_2023\_04\_17\_23.md](https://github.com/OpenMobileAlliance/dmse-wg/blob/master/minutes/Agenda\_and\_Minutes\_DMSE\_2023\_04\_17\_23.md)
   * 

       * Ari:  has a presentation on JSON models - 4/18/2023
       * Latest metadata structure can be seen in this section and next: [https://openmobilealliance.github.io/oma\_working\_groups/process-docs#software-licenses](https://openmobilealliance.github.io/oma\_working\_groups/process-docs#software-licenses)
       * The set of experimental OMA objects converted to SDF are now available here: [https://github.com/akeranen/lwm2m-registry/tree/oma-sdf/sdf](https://github.com/akeranen/lwm2m-registry/tree/oma-sdf/sdf)
       * 

   * [https://github.com/OpenMobileAlliance/dmse-wg/](https://github.com/OpenMobileAlliance/dmse-wg/)
   * ### Dmse-wg repo 
       * [https://github.com/OpenMobileAlliance/dmse-wg/issues](https://github.com/OpenMobileAlliance/dmse-wg/issues) (4) 
       * [https://github.com/OpenMobileAlliance/dmse-wg/pulls](https://github.com/OpenMobileAlliance/dmse-wg/pulls) (3)
   * 

   * ### MQTT Binding
   * MM: While working on MQTT test cases noticed that tenant’s name is specified as configuration defined parameter, but there is no resource for it specified in the MQTT server object or anywhere else? For a test case that is using tenant name to prefix the topics, how do you expect client can obtain the tenant's name:
   *   * server URI?
   *   * One of the exising object resources, which one??
   *   * Proprietary configuration information not covered by LwM2M specs?
   * DN: This is indeed something we missed. The PREFIX should be present in a resource of the MQTT Server object (ID: 24). For now, I would suggest to treat it as a “Proprietary configuration information not covered by LwM2M specs”.
   * MG: Should we created an issue for this and publish it in a new release?
   * See:  
   * [https://github.com/OpenMobileAlliance/LwM2M/issues/876](https://github.com/OpenMobileAlliance/LwM2M/issues/876)
   * [https://github.com/OpenMobileAlliance/LwM2M/issues/877](https://github.com/OpenMobileAlliance/LwM2M/issues/877)
   * MM: Bug fix could clarify for 1.2.1 yet 1.3 (e.g. could define) Single tenant is assumed for test currently
   * TS: Cloud providers have shown interest in MQTT
   * PLAN: Finish test cases, then MM will give a presentation with recommendations for the best way forward on 4/18/2023
   * MM Gave a presentation
       * JJ: There is a ietf draft on pubsub - topic and creation and deletion are separate operations - Draft coap pubsub
       * MM: Consider this an issue and come up with solutions going forward
       * ACTION: Matt to create a meeting on 4/24/2023 - Delayed til 4/1/2023
       * 

   * Firmware update #25 and #26. (!!)
   * 

   * Action Points: Jaime, Matt to review. 
   * MK to ask for opinion, come back in two weeks.
   * MK: Advanced firmware.  Itron to review,  have discussion
   * [https://github.com/OpenMobileAlliance/dmse-wg/pulls](https://github.com/OpenMobileAlliance/dmse-wg/pulls)
   * Move to next week
   * ACTION: MG will get a more formal write up on Itron's review - still in progress
   * ACTION: MG to remind Jaime and David to review PR 25 and PR 26
   * Move to DMSO-IoT and create a process to make a decision
   * 

### Spec fixes

   * 

   * Fred R has found some bugs on the Connectivity monitoring object.
   * #issue 875 [https://github.com/OpenMobileAlliance/LwM2M/issues/875](https://github.com/OpenMobileAlliance/LwM2M/issues/875)
   * The group agreed to remove the link to the TS in the lwm2m-registry, [https://technical.openmobilealliance.org/OMNA/LwM2M/LwM2MRegistry.html](https://technical.openmobilealliance.org/OMNA/LwM2M/LwM2MRegistry.html)
   * [https://github.com/OpenMobileAlliance/objects-lwm2m/pull/175](https://github.com/OpenMobileAlliance/objects-lwm2m/pull/175)  CORE object 4
   * ACTION:  Consider for 1.2.2
   * 

   * MG: Should we in the future decouple the object versions from the TS with core objects?
       * Appendix F needs to be reviewed
       * This will imply also decouple the publication.
       * FR: Appendix E has documented that "Objects may evolve independently from the CORE TS"
       * MM: This may be the first time we changed a CORE object outside of the TS
       * 

   * 

### Repository consolidation

   * JT: I think all admin/housekeeping can go into one repo, if possible
   * MG: Will make a first draft of working procedures then we will consider repo consolidation
       * - [https://github.com/OpenMobileAlliance/dmse-wg/blob/master/slides/DMSO-IoT%20WG%20procedures-v1.docx](https://github.com/OpenMobileAlliance/dmse-wg/blob/master/slides/DMSO-IoT%20WG%20procedures-v1.docx) has been submitted
   * 

AOB

MM: When can we review test cases

[https://github.com/OpenMobileAlliance/ETS\_LwM2M/pulls](https://github.com/OpenMobileAlliance/ETS\_LwM2M/pulls)

ACTION MG: Send an email calling for review of these pull requests





   * 

   * 


