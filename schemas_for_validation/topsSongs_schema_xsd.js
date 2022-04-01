const topSongsSchema = '<?xml version="1.0" encoding="UTF-8" ?>' +
    '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified">' +
    '    <xs:simpleType name="livelinessRestricted">' +
    '        <xs:restriction base="xs:int">' +
    '            <xs:minInclusive value="0"/>' +
    '            <xs:maxInclusive value="74"/>' +
    '        </xs:restriction>' +
    '    </xs:simpleType>' +
    '    <xs:simpleType name="danceabilityRestricted">' +
    '        <xs:restriction base="xs:int">' +
    '            <xs:minInclusive value="0"/>' +
    '            <xs:maxInclusive value="97"/>' +
    '        </xs:restriction>' +
    '    </xs:simpleType>' +
    '    <xs:simpleType name="energyRestricted">' +
    '        <xs:restriction base="xs:int">' +
    '            <xs:minInclusive value="0"/>' +
    '            <xs:maxInclusive value="98"/>' +
    '        </xs:restriction>' +
    '    </xs:simpleType>' +
    '    <xs:simpleType name="bpmRestricted">' +
    '        <xs:restriction base="xs:int">' +
    '            <xs:minInclusive value="0"/>' +
    '            <xs:maxInclusive value="209"/>' +
    '        </xs:restriction>' +
    '    </xs:simpleType>' +
    '    <xs:simpleType name="yearRestricted">' +
    '        <xs:restriction base="xs:int">' +
    '            <xs:minInclusive value="2010"/>' +
    '            <xs:maxInclusive value="2019"/>' +
    '        </xs:restriction>' +
    '    </xs:simpleType>' +
    '    <xs:complexType name="song-type">' +
    '        <xs:all>' +
    '            <xs:element name="id" type="xs:int"/>' +
    '            <xs:element name="title" type="xs:string"/>' +
    '            <xs:element name="artist" type="xs:string"/>' +
    '            <xs:element name="genre" type="xs:string"/>' +
    '            <xs:element name="year" type="yearRestricted"/>' +
    '            <xs:element name="bpm" type="bpmRestricted"/>' +
    '            <xs:element name="energy" type="energyRestricted"/>' +
    '            <xs:element name="danceability" type="danceabilityRestricted"/>' +
    '            <xs:element name="liveliness" type="livelinessRestricted"/>'+
    '        </xs:all>' +
    '    </xs:complexType>' +
    '    <xs:complexType name="song-types">' +
    '        <xs:sequence minOccurs="1" maxOccurs="unbounded">' +
    '            <xs:element name="song" type="song-type"/>' +
    '        </xs:sequence>' +
    '    </xs:complexType>' +
    '    <xs:element name="songs" type="song-types"/>' +
    '</xs:schema>';

module.exports = topSongsSchema;
