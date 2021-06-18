
# LwM2M Registry
This public repository is dedicated to store and register new LwM2M Objects and Reusable Resources.
  
# Registration Process  
Companies that would like to register a new Object or Reusable Resource should follow these steps:

 1. Create an Issue
 2. The Maintainer will create a new branch based on the Issue
 3. Create a new Object or revise and existing one
 4. Creat a Pull Request

The steps are described below. 
Please contact, helpdesk @ omaorg.org in case you encounter any problem during the submission

## 1. Create an Issue
* The Submitter nees to create an **[Issue](https://github.com/OpenMobileAlliance/lwm2m-registry)** before registering your ```Objects``` or ```Reusable Resources```
* In the Issue you must indicate what you would like to do:
  1. Create Version 1.0 of a new Object
  2. Create a new Version X.Y of an existing Object
  3. Create one or more Reusable Resources

## 2. New branch
* Based on the information provided in the Issue the Maintainer will:
  * Create a new `topic` or `feature-branch` to apply the changes
    * **Branch Name**: `ObjID_companyName`
  * Reserve one or more Objects ID or/and Reusable Resources ID based on the Issue

## 3. Create a new Object
* For each Object to register, the Submitter needs to create a new Object file using the **[LwM2M Editor](http://devtoolkit.openmobilealliance.org/OEditor/Legal?back=default.aspx)** **[Guidelines](https://github.com/OpenMobileAlliance/lwm2m-registry/wiki/Guidelines)** & **[Best Practice](https://wiki.openmobilealliance.org/display/TOOL/LwM2M+Best+Practice)**
* This Object file will be used at the next step when creating the Pull Request

## 4. Create a Pull Request
* The Submitter needs to create a Pull Request against the designated branch
* These are the steps to follow:
  4.1 Update the `DDF.xml` file
  4.2 Create a new Object or update an existing Object file
  4.3 Add the Object file to the `version_history` folder
  4.4 Update the `Common.xml` file (if you are registering Reusable Resources)

The next sections describe these steps in detail.

### 4.1 Update the `DDF.xml` file
* If the submission contains a new Object the `DDF.xml` file must be updated
* The `DDF.xml` file contains all the Objects in the Registry. Therefore, each time that a new Object is added  the `DDF.xml` file must be updated with a new Object placeholder.
  
**Example of a placeholder in the `DDF.xml` file for e.g., Object ID = 0, version 1.0**  

```xml
    <Item>        
        <ObjectID>0</ObjectID>
        <!-- Integer, this number is allocated by the Maintainer -->
        <!-- ObjecID also called ObjID-->
      
        <URN>urn:oma:lwm2m:oma:0</URN>
        <!-- URN of the object 
             for other versions than v1.0 the URN mus include the version, e.g., for v1.1 the URN is urn:oma:lwm2m:oma:0:1.1 -->
        <Name>LWM2M Security</Name>
        <!-- Name of the object -->
      
        <Description>Object description</Description>
        <!-- Description of the Object -->
      
        <Owner>Test WG</Owner>
        <!-- Name of the organization that has registered the object -->
      
        <Source>0</Source>
        <!-- Type of Object: 
             0 = defined by OMA, 
             1 = defined by external Standards Development Organizations, 
             2 = private or individual -->
      
        <Ver>1.0</Ver>
        <!-- Version of the object -->
      
        <DDF>version_history/0-1_0.xml</DDF>
        <!-- URL to the xml file describing the object 
             latest version the filename is stored in the root as ObjID.xml
             Previous versions the file are stored in the version_history folder as ObjID-X_Y.xml, were X.Y is the Object Version.-->
      
        <Vorto></Vorto>
        <!-- VOID- Link that opens the Object in the Vorto environment -->
      
        <DDFLink>1</DDFLink>
        <!-- 0 => if link to object should not be visible, 
             1 => if object should be visible (default) -->
      
        <TS>http://www.openmobilealliance.org/release/LightweightM2M/V1_0_2-20180209-A/OMA-TS-LightweightM2M-V1_0_2-20180209-A.pdf</TS>
        <!-- URL to the TS of the object, not visible, not used -->
        
        <TSLink>1</TSLink>
        <!-- 0 => if link to TS should not be visible, 
             1 => if link to TS should be visible (default) -->
    </Item>
 ```
 
### 4.2 Update or create a new `ObjID.xml` file
* In this step, if you are creating a first version of an Object, version 1.0, then you must add a fully qualified `ObjID.xml` file to the allocated branch, or
* If you are revising an existing Object, e.g. version 1.1 of Object ID `0.xml`, then you can modify directly the existing Object on the root of the allocated branch. But later you will have to add the new revision of the Object to the `history_folder`, see next step.
    
### 4.3 Add a new `ObjID-X_Y.xml` file to the `version_history` folder
 * Each Object version, must have a file in the `version_history` folder
 * The name of the file for e.g., for Object ID 0, Version 1.1, is `0-1_1.xml`
    * The content of the `0-1_1.xml` file is the same as conten of the file `0.xml` for version 1.1
      * IPSO keeps in the `version_history` folder a file for each Object in the registry, the file name indicates the ObjID and the version of the Object

### 4.4 Updates the `Common.xml` file (if adding new Reusable Resources)**
 * If the request is to add one or more Reusable Resources, then for each Reusable Resource a new placeholder must be added to the `Common.xml` file

**Example of Reusable Resource placeholder**

  ```xml          
      <Item ID="4000">
        <!-- Resource ID of the reusable resource 
             Reusable Resource IDs are allocated by the Maintainer, this is one of the reasons to raise an Issue in the first place -->
        
        <Name>ObjectInstanceHandle</Name>
        <!-- Name of the reusable resource -->
        
        <Operations>R</Operations>
        <!-- Allowed Operation on the reusable resource-->
        
        <Type>Objlnk</Type>
        <!-- Type of the reusable resource -->
        
        <RangeEnumeration></RangeEnumeration>
        <!-- Range/Enumeration of the reusable resource
             A range is expressed with (..),e.g., from 0 to 10, it is expressed as; `(0..10)`
          -->
        
        <Units></Units>
        <!-- Unit of the reusable resource 
             Please note the units expressed in this element MUST comply with the units defined in the SenML Registry -->
        
        <Submitter>OMA</Submitter>
        <!-- Name of the organization that has registered the object -->
        
        <Description><![CDATA[Reusable Resource Description]]></Description>
        <!-- Description of the reusable resource -->
        
        <TS></TS>
        <!-- Link to the technical specification (word, pdf etc.) -->
        
        <TSLink>0</TSLink>
        <!--    0 => if link to TS should not be visible, 1 => if link to TS should be visible (default) -->
      </Item>
  ```
 ## 5. Autovalidation
 * As soon as the Pull Request is created against the designated branch, the LwM2M Validator will evaluate the conent of the Pull Request
 * At the end of the validation, the LwM2M Validator will insert a lable in the Pull Request indicating the result of the validation: `Failed Validation` or `Passed Validation`
 * If the validation failed, then the LwM2M Validator will insert a table with the list of errors identified during the validation
   * The [Error Codes](https://wiki.openmobilealliance.org/display/TOOL/Validation+Error+Code), indicate who whould resolve the problem, the Submitter or the Maintainer
 * If the validation passed, then a green label will be displayed and the IPSO group will be able to review your submission
