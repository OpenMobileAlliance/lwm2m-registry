## Introduction

The availability of Internet Protocol (IP) on constrained devices with memory sizes of 16 kilobytes or less, including IPV6 and 6LowPAN, has made possible a new kind of interoperability for connected devices and Smart Objects.

The IETF specify a set of standard protocols for IP-enabled networks in Constrained Resource Environments (CoRE), including the Constrained resource Application Protocol (CoAP, RFC 7252) applicable to low power and low connection bandwidth devices. CoAP is an application protocol for machines and connected devices, as http is for web browsers, but designed specifically for machine interaction and operation over networks of constrained devices.

IPSO Smart Object Guidelines provide a common design pattern, an object model, that can effectively use the IETF CoAP protocol to provide high level interoperability between Smart Object devices and connected software applications on other devices and services.

The common object model is based on the Lightweight Machine to Machine Technical Specification. LWM2M is a device management and service architecture specification that provides a simple and flexible object template (object model) for constrained device management.

The object model from OMA LWM2M is reused to define application level IPSO Smart Objects. This enables the OMA Name Authority (OMNA) to be used to register new objects, and enables existing LWM2M compliant device libraries and server software to be used as an infrastructure for IPSO Smart Objects.

The object model can optionally be used with any protocol, for example HTTP, that supports the web standard content types and REST methods defined in the Lightweight Machine to Machine Technical Specification.

## New in IPSO Smart Objects version 1.0

This specification defines version 1.0 of the IPSO Smart Objects specification with the following changes:

* Merger of the original "Smart Object Starter Pack" and "Smart Object Expansion Pack" objects

* Addition of more than a hundred new IPSO Objects.

* Addition of all Reusable Resources

## References

<table>
    <caption>References</caption>
    <tbody>
        <tr>
          <td><strong>[CoAP]</strong></td>
          <td>Shelby, Z., Hartke, K., Bormann, C., and B. Frank, "The Constrained Application Protocol (CoAP)", IETF RFC 7252, June 2014</td>
        </tr>
        <tr>
          <td><strong>[LwM2M-CORE]</strong></td>
          <td>Open Mobile Alliance, "Lightweight Machine to Machine Technical Specification: CORE"</td>
        </tr>

        <tr>
          <td><strong>[LwM2M-TRANSPORT]</strong></td>
          <td>Open Mobile Alliance, "Lightweight Machine to Machine Technical Specification: Transport Layer"</td>
        </tr>
    </tbody>
</table>
