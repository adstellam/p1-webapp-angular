export interface VedasMetrics {
	deviceId: string;
	vedasOn: boolean;
    engineOn: boolean;
    miles: number;
    lat: number;
    lng: number;
    speed: number; 
    eyeClosure: number; 
    headPose; number;
    laneAlign: number; 
    t: number;
}

export interface AnalyticMeasures {
	deviceId: string;
	riskScore: number;
    measure1: number;
	measure2: number;
	measure3: number;
	measure4: number;
	measure5: number;
	measure6: number;
	measure7: number;
	measure8: number;
	measure9: number;
    t: number;
}

//*
export interface Rtd {
	deviceId: string;
	vedasOn: boolean;
    engineOn: boolean;
    lat: number;
    lng: number;
    spd: number;
    loc: string;
    riskLevel: string;
	alertMsg: string;
}

//*
export interface Hos {
	driverId: string;
	secHos: number;
	dutyStatus: string;
}

//*
export interface LatLng {
	lat: number;
	lng: number;
}

//*
export interface JwtObj {
    jwt: string;
}

//*
export interface JwtPayload {
	iss: string;
	uid: string;
	cid: string;
	role: string;
}

export interface EldEvent {
	id: number; //t for json-server
	deviceId: string;
	driverId: string;
	seqNumber: number;
	version: number;
	status: string;
	origin: string;
	type: string;
	code: string;
	vehicleMiles: number;
	engineHours: number;
	lat: number;
	lng: number;
	location: string;
	malIndicatorStatus: string;
	ddeIndicatorStatus: string;
	mdeCode: string;
	comment: string;
	dateStr: string;
	timeStr: string;
}
	/*  [type]
	 *  1: Change in driver's duty status [codes 1 - 4]
	 *  2: Intervening logging [codes 1 - 2]
	 *  3: Change in driver's indication re personal use of vehicle [codes 1 - 3]
	 *  4: Driver's certification of event records [codes 1 - 9]
	 *  5: Login [code 1] and logout [code 2]
	 *  6: Engine powerup [code 1 or 2] and shutdown [code 3 or 4]
	 *  7: Malfuction or data diagnostic event detection
	*/
	/*  [code]
	 *  For type 1
	 *  	1: OFF (Off-duty)
	 *  	2: SB (Sleeper Berth)
	 *  	3: D (Dring)
	 *  	4: ON (On-duty not driving)
	 *  For type 2
	 *      1: Intervening logging with conventional location precision (2 decimal)
	 *      2: Intervening logging with reduced location precision (1 decimal)
	 *  For type 3
	 *		1: PC (Personal use)
	 *		2: YM (Yard move)
	 *		3: C (Personal use/yard move cleared)
	 *  For type 4
	 *      1: First certification
	 *      n: n-th (re)certification (n <= 9) 
	 *  For type 5
	 *      1: Driver login
	 *      2: Driver logout
	 *  For type 6
	 *      1: Engine power-up
	 *      2: Engine power-up with reduced precision
	 *      3: Engine power-down
	 *      4: Engine power-down with reduced precision
	 *  For type 7
	 *      1: Malfunction
	 *      2: Malfunction cleared
	 *      3: Data diagonostic event
	 *      4: Data diagonostic event cleared
	*/
	/*  [status]
	 *  1: Active
	 *  2: Inactive/changed
	 *  3: Inactive/changed requested
	 *  4: Inactive/changed rejected
	*/
	/*  [origin]
	 *  1: Auto
	 *  2: Driver
	 *  3: Support personnel
	 *  4: Assumed from unauthentical driver profile
	*/

//*
export interface EldEventPair {
	pre: EldEvent;
	post: EldEvent;
}

export interface EldRecord {
	id: number; //t for json-server
	driverId: string;   
	dateStr: string;    
	version: number;    
	eldEventSeqStr: string;
	urlPdfFile: string;
	certifiedAt: Date;
	certifiedBy: string;
	certifiedCount: number;
}

//*
export interface EldDateObj {
	dateStr: string;
	from: number;
	to: number;
}

export interface VedasUser {
	id: string; //username
	username: string;
	password: string;
	cid: string;
	role: string;
	lastName: string;
	firstName: string;
	phone: string;
	email: string;
	createdAt: Date;
	createdBy: string;
	editedAt: Date;
	editedBy: string;
	active: boolean;
}

export interface VedasUserSession {
	id: string;  //username
	username: string;
	code: string;
	t: number;
}

export interface Customer {
	id: string;  
	name: string;
	dotNumber: string;
	streetAddress: string;
	city: string;
	state: string;
	zip: number;
	phone: string;
	email: string;
	contactPerson: string;
	logoFileName: string;
	timezone: string;
	eldDayStart: number;
	createdAt: Date;
	createdBy: string;
	editedAt: Date;
	editedBy: string;
	active: boolean;
}

export interface Device {
	id: string;  
	cid: string;
	hardwareVersion: string;
	softwareVersion: string;
	optionalPeripheral: string[];
	ipAddress: string;
	ipAddressType: string;
	nsp: string;
	vehicleId: string;
	driverId: string;
	codriverId: string;
	createdAt: Date;
	createdBy: string;
	editedAt: Date;
	editedBy: string;
	active: boolean;
}

export interface DeviceSeqNumber {
	id: string;
	seqNumber: number;
}

export interface DeviceEngineSession {
	id: string;  
	deviceId: string;
	code: string; //on|off
	t: number;
}

export interface Vehicle {
	id: string;          
	cid: string; 
	vin: string;
	powerUnitNumber: string;
	make: string;
	model: string;
	year: number;
	milesAtMilClear: number;
	trailerNumber: string;
	shippingDocNumber: string[];
	deviceId: string;
	createdAt: Date;
	createdBy: string;
	editedAt: Date;
	editedBy: string;
	active: boolean;
}

export interface Driver {
	id: string;          
	cid: string;  
	firstName: string;
	lastName: string;
	licenseNumber: string;
	licenseState: string;
	phone: string;
	email: string;
	eldExemptionStatus: string;
	pictureFileName: string;
	createdAt: Date;
	createdBy: string;
	editedAt: Date;
	editedBy: string;
	active: boolean;
}

export interface DriverStatus {
	id: string; 
	signedIn: boolean;
	signedInAsCodriver: boolean;
	dutyStatus: string;
	intentIndication: string;
}

export interface DriverHosSession {
	id: string; 
	code: string; //on|off
	t: number;
}

export interface Asset {
	id: string; //shippingDocumentNumber
	cid: string;
	type: string;
	length: number;
	width: number;
	height: number
	weight: number;
	shipper: string;
	origin: string;
	destination: string;
	createdAt: Date;
	createdBy: string;
	editedAt: Date;
	editedBy: string;
	active: boolean;
}
