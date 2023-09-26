import React,{ useState, useMemo, useEffect,useRef }  from 'react';
import '../../styles/css/pages/WorkContract.css';
import CustomCalendar from '../../components/Contents/CustomCalendar';
import CustomInput from '../../components/Contents/CustomInput';
import CustomButton from '../../components/Contents/CustomButton';
import SearchBarBox from '../../components/SearchBar/SearchBarBox';
import Table from '../../components/TablesLib/Table';
import Input from '../Contents/Input';
import DaumPostcode from 'react-daum-postcode';
import useApiRequest from '../Services/ApiRequest';
import CustomModal from '../../components/Contents/CustomModal';
import PageHeaderName from "../../components/PageHeader/PageHeaderName";
import CustomSelect from '../../components/Contents/CustomSelect';
import SweetAlert from '../Contents/SweetAlert';




const WorkContractCreate = ({checkColumn,setCheckColumn, handleCheckboxChange,employeeData,setEmployeeData }) => {

  const apiRequest = useApiRequest();
  // const [employeeData, setEmployeeData] = useState([]); //왼쪽table사원 data
  const [openPostcode, setOpenPostcode] = useState(false); // 주소모달 상태
  // const [CheckColumn2,setCheckColumn2] = useState(checkColumn);  //pops로 받은 checkcoulmn복사하기
  const [selectAll, setSelectAll] = useState(false); // checkbox가 모두 check된 상태 관리
  const [belongingDate, setBelongingDate] = useState(""); //조건조회시 년월 달력 상태 관리.
  const [searchOrder,setSearchOrder] = useState("1"); // 정렬 방법 관리 State
  const [paramGetEmpList1,setParamGetEmpList1] = useState({
    dtStartCont: '',
    dtEndCont: '',
    noWorkPost: '',
    addrWork: '',
    addrWorkDtl: '',
    cntnJob: '',
    tmStartRegularWork: '',
    tmEndRegularWork: '',
    tmStartBreak: '',
    tmEndBreak: '',
    ddWorking: '',
    dotw: '',
    tpSal: '',
    amtSal: '',
    tpPayDtSal: '',
    ddPaySal: '',
    methodPay: '',
    ynEmpInsurance: '',
    ynIndustrialAccidentInsurance: '',
    ynNationalPension: '',
    ynHealthInsurance: '',
    stSign: '',
    dtCreated: '',
  }) // 오른쪽 table 상태관리
  const [clickCode,setClickCode] = useState(""); //code click시 값을 저장할 state
  const [showInsertRow, setShowInsertRow] = useState(false); // 테이블의 insertRow의 상태
  const [modalEmpList, setModalEmpList] = useState([]); // 모달창에 넣을 사원 정보
  const [modalIsOpen2, setModalIsOpen2] = useState(false); // 추가 모달 on off 상태
  const [clickModalEmpCode, setClickModalEmpCode] = useState(null); // 현재 클릭한 cdEmp 저장하는 상태
  const [payState,setPayState] = useState("on"); // 임금지급일에 따른 style 상태 관리, 초기값 on
  // const [addrWorkDtl,setaddrWorkDtl] = useState(""); // validation을 위한 상세주소 값 addrWorkDtl
  // const [valicntnJob,setValicntnJob] = useState(""); // validation을 위한 업무내용 값 cntnJob
  // const [valitmStartRegularWork,setValitmStartRegularWork] = useState(""); // validation을 위한 근로시작시간 값 tmStartRegularWork
  // const [valitmEndRegularWork,setValitmEndRegularWork] = useState(""); // validation을 위한 근로종료시간 값 tmEndRegularWork
  // const [valitmStartBreak,setValitmStartBreak] = useState(""); // validation을 위한 휴게시간 시작 tmStartBreak
  // const [valitmEndBreak,setValitmEndBreak] = useState(""); // validation을 위한 휴게시간 종료 tmEndBreak
  const [showAlert, setShowAlert] = React.useState(false); // sweetalret1
  const [showAlert2, setShowAlert2] = React.useState(false); // sweetalret2
  const [showAlert3, setShowAlert3] = React.useState(false); // sweetalret2
  const [showAlert4, setShowAlert4] = React.useState(false); // sweetalret2
  const [showAlert5, setShowAlert5] = React.useState(false); // sweetalret2
  const [showAlert6, setShowAlert6] = React.useState(false); // sweetalret2
  const [showAlert7, setShowAlert7] = React.useState(false); // sweetalret2



  const [validate,setValidate] = useState({
    addrWorkDtl: '',
    cntnJob: '',
    tmStartRegularWork: '',
    tmEndRegularWork: '',
    tmStartBreak: '',
    tmEndBreak: '',
  }) //get, update후 최초값과 비교하기 위해 사용할 state

  const prevParamGetEmpList1Ref = useRef(paramGetEmpList1);

  useEffect(() => {
    prevParamGetEmpList1Ref.current = paramGetEmpList1;
  });

  
  const contractPeriodCalendar1 = async(newDate) => {
      newDate = newDate.replace(/-/g, "");
      const cdEmp = clickCode;
      const data = newDate;
      const colum = "dtStartCont";
  
      if (!cdEmp || data === "") return;
  
      // 만약 dtEndCont 값이 있고, dtStartCont가 dtEndCont보다 크다면 오류를 표시합니다.
      if (paramGetEmpList1.dtEndCont && data > paramGetEmpList1.dtEndCont) {
        setShowAlert(true)
          return; //시작 근로계약 기간은 종료 근로계약 기간보다 빠를 수 없습니다
      }
  
      setParamGetEmpList1({ ...paramGetEmpList1, dtStartCont: data });
  
      try {
        const responseData = await apiRequest({
          method: "PUT",
          url: `/api2/wc/updateEmpList?cdEmp=${cdEmp}&colum=${colum}&data=${data}`,
        });
      } 
      catch (error) {
        console.error("Failed to fetch emp data:", error);
      }
  }
  
  const contractPeriodCalendar2 = async(newDate) => {
      newDate = newDate.replace(/-/g, "");
      const cdEmp = clickCode;
      const data = newDate;
      const colum = "dtEndCont";
  
      if (!cdEmp || data === "") return;
  
      // 만약 dtStartCont 값이 있고, dtEndCont가 dtStartCont보다 작다면 오류를 표시합니다.
      if (paramGetEmpList1.dtStartCont && data < paramGetEmpList1.dtStartCont) {
        setShowAlert2(true)
          return; //종료 근로계약 기간은 시작 근로계약 기간보다 늦을 수 없습니다.
      }
  
      setParamGetEmpList1({ ...paramGetEmpList1, dtEndCont: data });
  
      try {
        const responseData = await apiRequest({
          method: "PUT",
          url: `/api2/wc/updateEmpList?cdEmp=${cdEmp}&colum=${colum}&data=${data}`,
        });
      } 
      catch (error) {
        console.error("Failed to fetch emp data:", error);
      }
  }

  const contractPeriodCalendar3 = async(newDate) => {
    newDate = newDate.replace(/-/g, "");
    const cdEmp = clickCode
    const data = newDate
    const colum = "dtCreated"
    if (cdEmp == null || cdEmp === "" || cdEmp === undefined || data === "") {
      return;
    }
    console.log(cdEmp);
    console.log(data);
    console.log(colum);

    setParamGetEmpList1({ ...paramGetEmpList1, dtCreated:data })

    try {
      const responseData = await apiRequest({
        method: "PUT",
        url: `/api2/wc/updateEmpList?cdEmp=${cdEmp}&colum=${colum}&data=${data}`,
      });

      const empListResponseData = await apiRequest({
        method: "GET",
        url: `/api2/wc/getEmpList?creDate=${belongingDate}&orderValue=${searchOrder}`, 
      });

      
      setEmployeeData(empListResponseData);


    } 
    catch (error) {
      console.error("Failed to fetch emp data:", error);
    }
    


  }


  // 온체인지
  const inputOnChange = async (e) =>{ // select tag나 건드릴수 없는 input tag의 경우만. put api날리고 나머지는 set만 set한건 onBlur에서 put api날릴 것
    
    const cdEmp = clickCode;
    const data = e.target.value;
    const colum = e.target.id;

    console.log(cdEmp);
   
    if (cdEmp === null || cdEmp === "" || cdEmp === undefined) {
      return;
    } // code값이 공백이면 종료
    
    if (data === "") { //맨앞자리가 지워지지않는 것때문에
      setParamGetEmpList1({
        ...paramGetEmpList1,
        [e.target.id]: data
      });
      return;
    }
    


    if(colum === "tmStartRegularWork" ||
       colum === "tmEndRegularWork" ||
       colum === "tmStartBreak" ||
       colum === "tmEndBreak" 
    ) //시간 관련된 validation
    {
     


      if(2400<data){ // 시간이 2400을 넘기면 변경x
        return
      }
      const onlyNumbers = /^[0-9]*$/;

    // 입력값이 숫자로만 이루어져 있지 않으면 변경하지 않음
    if (!onlyNumbers.test(data)) {
      return;
    }
    
  
    
  }


    
    
    
    
    

    if(colum === "amtSal" ){ // 임금금액 validation
      const modifyData = e.target.value.replace(/\D/g, ''); // 숫자이외제거, 숫자만 입력되게
      const data = modifyData.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      setParamGetEmpList1({...paramGetEmpList1,
        [e.target.id] : data
          })
          return
    }

    if(colum === "tpPayDtSal"){ //임금지급일 미지급 매주 매일 일경우 off
      if(e.target.value ==="0" ||
      e.target.value ==="2" ||
      e.target.value ==="3" ){
        setPayState("off")
      }
      else{
        setPayState("on")
      }
    }


      if(colum ==="ddPaySal"&& payState === "on" ){ // 32일이 넘으면 변경x
       if(data > 31){
        return
       }
      
   
      }

      if(colum ==="addrWorkDtl" ||
      colum ==="cntnJob"){
        const forbiddenCharacters = /[!@#$%^&*]/;
    // 입력값이 특수문자를 포함하고 있으면 변경하지 않음
    if (forbiddenCharacters.test(data)) {
      return;
    }
      }


      

      


    setParamGetEmpList1({...paramGetEmpList1,
    [e.target.id] : data
      })

    

      

      if(
        colum ==="noWorkPost" ||
        colum === "addrWork" ||
        colum === "ddWorking" ||
      colum === "dotw" ||
      colum === "tpSal" ||
      colum === "tpPayDtSal" ||
      colum === "methodPay" ||
      colum === "ynEmpInsurance" ||
      colum === "ynIndustrialAccidentInsurance" ||
      colum === "ynNationalPension" ||
      colum === "ynHealthInsurance" ||
      colum === "stSign") {

          try {
            const responseData = await apiRequest({
              method: "PUT",
              url: `/api2/wc/updateEmpList?cdEmp=${cdEmp}&colum=${colum}&data=${data}`,
            });
          } 
          catch (error) {
            console.error("Failed to fetch emp data:", error);
          }

        }
        


  } // input tag에 변화가 발생했을때 상태를 복사하고 바뀐값만 변경하는 set함수 호출
  // 상태만 변경하는 함수.


  
  
  
  //온블러
  const inputOnBlur = async (e) => {
    
    const cdEmp = clickCode;
    const colum = e.target.id;
    const data = e.target.value;
  
   

    if (!cdEmp) return; 
    
     if( validate[colum]===data){ 
      console.log("초기값과 같으면 종료");
      return};
    
       

 
      const validateTimeDifference = (startTime, endTime) => {
        if (startTime && endTime && startTime.length === 4 && endTime.length === 4) {
          if (startTime > endTime) {
            return false;
          }
        }
        return true;
      };


      const isValidTime = (timeStr) => {
        const hour = parseInt(timeStr.substring(0, 2), 10);
        const minute = parseInt(timeStr.substring(2, 4), 10);
      
        return hour < 24 && minute < 60;
      };
      
      if (colum === "tmStartRegularWork" || colum === "tmEndRegularWork") {

        if (data && data.length !== 4) {
          setShowAlert3(true);
          return;
        }
      
        if (data && !isValidTime(data)) {
          setShowAlert4(true);
          return;
        }
      
        // 정기 근무 시간 검증
        if (!validateTimeDifference(paramGetEmpList1.tmStartRegularWork, paramGetEmpList1.tmEndRegularWork)) {
          setShowAlert5(true);
          return;
        }
      
      } else if (colum === "tmStartBreak" || colum === "tmEndBreak") {
      
        if (data && data.length !== 4) {
          setShowAlert3(true);
          return;
        }
      
        if (data && !isValidTime(data)) {
          setShowAlert4(true);
          return;
        }
      
        // 휴식 시간 검증
        if (!validateTimeDifference(paramGetEmpList1.tmStartBreak, paramGetEmpList1.tmEndBreak)) {
          setShowAlert6(true);
          return;
        }
      
        // 휴식 시간이 정기 근무 시간 사이에 있는지 검증
        if (
          paramGetEmpList1.tmStartBreak < paramGetEmpList1.tmStartRegularWork ||
          paramGetEmpList1.tmEndBreak > paramGetEmpList1.tmEndRegularWork
        ) {
          setShowAlert7(true);
          return;
        }
      }
      
      

  
    try {
      console.log("onBlur진입 put");
      const responseData = await apiRequest({
        method: "PUT",
        url: `/api2/wc/updateEmpList?cdEmp=${cdEmp}&colum=${colum}&data=${data}`,
      
        
      
      });

      const responseData2 = await apiRequest({ //update된 값 가져와서 Validatae set하기 위해
        method: "GET",
        url: `/api2/wc/getCodeParamEmpList?code=${clickCode}`, 
      });
      setValidate(responseData2);
    } catch (error) {
      console.error("Failed to fetch emp data:", error);
    }
  };

          
 

  //작성년월 이벤트핸들러
  const handleBelongingDateChange = async (newDate) => {
    setParamGetEmpList1([]);
    newDate = newDate.replace(/-/g, "");
    setBelongingDate(newDate);
    
    try {
        // 첫 번째 API 요청
        const responseData = await apiRequest({
            method: "GET",
            url: `/api2/wc/getEmpList?creDate=${newDate}&orderValue=${searchOrder}`,
        });
        setEmployeeData(responseData);


        // const firstCdEmp = responseData && responseData[0] ? responseData[0].cdEmp : null;    // responseData의 첫 번째 항목에서 cdEmp 값을 가져옵니다.
        // setClickCode(firstCdEmp);
        // if (firstCdEmp) {
        //     // 두 번째 API 요청
        //     const responseData2 = await apiRequest({
        //         method: "GET",
        //         url: `/api2/wc/getCodeParamEmpList?code=${firstCdEmp}`, 
        //     });
  
        //     setParamGetEmpList1(responseData2); // set paramGetEmpList using the new data
        //     setValidate(responseData2); // store the initial values from the server
        // }

    } catch (error) {
        console.error("Failed to fetch emp data:", error);
    }
  };
  
  



 

  const dataModalEmpList = useMemo(
    () =>
      modalEmpList.map((emp) => ({
        cdEmp: emp.cdEmp,
        nmEmp: emp.nmEmp,
        noResident : emp.noResident,
      })),
    [modalEmpList],
  );

  // 모달창 닫으면 바로 사원 인서트
  const closeModalAndEmpInsert = async () => {
    closeModal2();


    try {
      const responseData = await apiRequest({
        method: "GET", //GET으로 가져와서 State set해주면됨.
        url: `/api2/wc/getModalData?cdEmp=${clickModalEmpCode}`,
      });
      
      setShowInsertRow(false);
      console.log("서버에서 넘어온 데이터 ");
      console.log(responseData);
      setEmployeeData((prevEmployeeData) => [...prevEmployeeData, responseData]);
      setClickCode(clickModalEmpCode);
    } catch (error) {
      console.error("Failed to fetch emp data:", error);
    }





  };

{/*
modal 에서 주소눌렀을때 이벤트 핸들러



*/}
  const handleAddressSelect = async(addr) => {
  

    console.log(addr.address);
    console.log(addr.jibunAddress);
  
  
    // 상태를 업데이트하여 주소와 우편번호를 입력란에 설정
      setParamGetEmpList1(prevState => ({
        ...prevState,
        noWorkPost: addr.zonecode,
        addrWork: addr.address
      }));

      const cdEmp = clickCode;
      const colum1 = "noWorkPost";
      const colum2 = "addrWork";

  try {
    const responseData = await apiRequest({
      method: "PUT",
      url: `/api2/wc/updateEmpList?cdEmp=${cdEmp}&colum=${colum1}&data=${addr.zonecode}`, // 실제 주소 값에 맞게 수정해야 함
    });
  } 
  catch (error) {
    console.error("Failed to update address:", error);
  }

  try {
    const responseData = await apiRequest({
      method: "PUT",
      url: `/api2/wc/updateEmpList?cdEmp=${cdEmp}&colum=${colum2}&data=${addr.address}`, // 실제 주소 값에 맞게 수정해야 함
    });
  } 
  catch (error) {
    console.error("Failed to update address:", error);
  }
  

      setOpenPostcode(false);
    
  };
  

  const data = useMemo(
    () =>
    employeeData.map((emp) => ({
        cdEmp: emp.cdEmp,
        nmEmp: emp.nmEmp,
        noResident: emp.noResident,
      })),
    [employeeData]
  );

  useEffect(() => {
    console.log("employeeData 변경됨:", employeeData);
  }, [employeeData]); //  변경될 때만 실행
  
  
//delete 맨위 체크박스 all selcet의 이벤트 핸들러
  const selectAllCheckBox = (e) =>{
  
    if (selectAll) {
      setCheckColumn([]); // 모두 해제
    } else {
      setCheckColumn(data.map(d => d.cdEmp)); // 모든 cdEmp 값을 배열에 넣음
    }
    setSelectAll(!selectAll); // selectAll 상태 토글

    
  
    
  }



  


  const searchOrderOption = async (e) => {
    setSearchOrder(e.target.value);
    if (belongingDate) { // 달력에 값이 있는지 확인
        try {
            const responseData = await apiRequest({
                method: "GET",
                url: `/api2/wc/getEmpList?creDate=${belongingDate}&orderValue=${e.target.value}`,
            });
            setEmployeeData(responseData);
            console.log(employeeData);
            setParamGetEmpList1([]);
        } catch (error) {
            console.error("Failed to fetch emp data:", error);
        }
    }
};











//온클릭
  const handleInputClick = async(e) => { //왼쪽 Table 클릭시 호출되는 함수.
    // 1. parametr로 보낼 code state로 관리하기, 모든 cell에서 눌렀을때 code를 가져와야함. 
    // 2. e.target으로 찾기.
    // 어차피 e.target을 통해 찾아야 함.
  
    const code = e.target.parentElement.parentElement.querySelector('td:nth-child(2) input');

    if(code.value){
      
    const param = code.value
    setClickCode(param);
    console.log(param); //잘가져옴
    try {
     
      const responseData = await apiRequest({
        method: "GET",
        url: `/api2/wc/getCodeParamEmpList?code=${param}`, 
      });
     
      setParamGetEmpList1(responseData) //code get emplist
      setValidate(responseData); //server에서 가져온 초기값 저장.
  
      
    } catch (error) {
      console.error("Failed to fetch emp data:", error);
    }
  }
  else{
    
    openModal2(e);
    try {
      const responseData = await apiRequest({
        method: "GET",
        url: "/api2/wc/getModalEmpList",
      });
      setModalEmpList(responseData);
    } catch (error) {
      console.error("Failed to fetch emp data:", error);
    }

  }
  
  };
  //왼쪽 Table 아무영역 눌렀을때 발생시킬 event 
  // 방법 1 : 조건조회할때 미리 다 가져와 뿌리기. 사람이 많아졌을때 고려하면 x
  // 방법 2 : 필요한 VO만 가져온후 왼쪽 Table 누를 경우 api 보내기

  useEffect(() => {
    console.log(paramGetEmpList1);
  }, [paramGetEmpList1]); // 변경될때만 실행. 가져온 VO확인용, set이 제대로 반영됐는지 안됐는지 확인할때 쓰는 용

  useEffect(() => {
    console.log(checkColumn);
  }, [checkColumn]); // 



  const addrButtonClick= () => {
    setOpenPostcode(true);
  }; //모달열기

  const closeModal = () =>{
    setOpenPostcode(false);
  }


  const openModal2 = () => {
    setModalIsOpen2(true);
  };

  const closeModal2 = () => {
    setModalIsOpen2(false);
  };
// 사원추가 모달 끄고 닫기.


const firstRowRef = useRef(null);



  const columns = useMemo(
    () => [

      {
        Header: 
          ()=>{
            return(
            <input 
          type='checkbox'
          onChange={selectAllCheckBox}
          checked={data.length===checkColumn.length}
          />)
          }
        ,
        accessor: "checkbox",
        id: "checkbox",
        width:"10%",
        Cell: ({ cell: { value }, row :{original} }) =>{ 
        return(
          <>
        <input 
        type="checkbox"  
        onChange={e => handleCheckboxChange(e, original.cdEmp)}
        checked={original && original.cdEmp && checkColumn.includes(original.cdEmp)} // 현재 체크박스가 checkColumn 배열에 있는지 확인
        //props로 checkColumn을 넘겨받은 뒤 checkColumn.includes(origianl.cdEmp)평가시점이 달라져 null을 자꾸 가져와서  그것을 방지하기 위해 작성한 code
        className = {"doubleLine"}
        
          />
        
        </>
        );
      
      }
      }
      ,
      {
        Header: "Code",
        accessor: "cdEmp",
        id: "cdEmp",
        width: "20%",
        Cell: ({ cell: { value }, row :{original},   }) => {
          const [inputValue, setInputValue] = useState(value);
          const [modalApper,setModalApper] = useState("")
          
  
          //console.log(original.cdEmp);console.log(value); 둘이 같다.
          

          const handleInputChange = (e) => {
            // setInputValue(e.target.value);
          };

          // const handleInputClick = (e) => {
          //   // const ele = e.target.parentElement.parentElement.parentElement.querySelector('tr:nth-child(1)');
          //   // ele.style.backgroundColor = 'var(--color-secondary-blue)';
          // };

          const inputBlur = (e) => {
            // const ele = e.target.parentElement.parentElement.parentElement.querySelector('tr:nth-child(1)');
            //  ele.style.backgroundColor = '';
            
          }


          /*Code input에서 mouse 올라오면 state 변경하는 함수 */
          const mouseOverModalOn = ()=>{


            

            // setModalApper("on");
            
          };

          /*Code input에서 mouse 나갈시 state 변경하는 함수*/ 
          const mouseOutModalOff = ()=>{
            // setModalApper("off");
          };

          /*Code input에 code 도우미 render 함수*/ 
          const modalApperFunc = () =>{
            if(modalApper === "on"){
              return null;
            }
            else return null;

          };

          return (
            <Input
             
              value={original?.cdEmp||""}
              onClick={handleInputClick }
              onBlur={inputBlur}
              onChange={handleInputChange}
              onMouseOver={mouseOverModalOn}
              onMouseOut= {mouseOutModalOff}
              modalRender = {modalApperFunc}
              className = {"doubleLine"}
              
            
            />

          );

        },
      },
      {
        Header: "사원명",
        accessor: "nmEmp",
        id: "nmEmp",
        width: "20%",
        Cell: ({ cell: { value }, row :{original}  }) => {
          const [inputValue, setInputValue] = React.useState(value);
          

          // const handleInputClick = (e) => {
          //   // const ele = e.target.parentElement.parentElement.parentElement.querySelector('tr:nth-child(1)');
          //   //  ele.style.backgroundColor = 'var(--color-secondary-blue)';
        
          // }; // input tag Click시 발생할 event

          const inputBlur = (e) => {
            // const ele = e.target.parentElement.parentElement.parentElement.querySelector('tr:nth-child(1)');
            //  ele.style.backgroundColor = '';
          }
      

          const handleInputChange = (e) => {
            setInputValue(e.target.value);
          };

          return (
            <Input
              value={original?.nmEmp||""}
              onClick={handleInputClick}
              onBlur={inputBlur}
              onChange={handleInputChange}
              className = {"doubleLine"}
              
              
            />
          );
        },
      },
      
      {
        Header: "주민번호",
        accessor: "noResident",
        id: "noResident",
        Cell: ({ cell: { value }, row :{original} } ) => {
          const [inputValue, setInputValue] = React.useState(value);

          // const handleInputClick = (e) => {
          //   // const ele = e.target.parentElement.parentElement.parentElement.querySelector('tr:nth-child(1)');
          //   // ele.style.backgroundColor = 'var(--color-secondary-blue)';
          // };

          const inputBlur = (e) => {
            // const ele = e.target.parentElement.parentElement.parentElement.querySelector('tr:nth-child(1)');
            //  ele.style.backgroundColor = '';
          }

          const handleInputChange = (e) => {
            setInputValue(e.target.value);
          };
          //original?.noResident||""
          return (
            <Input
              value={original?.noResident||""}
              onChange={handleInputChange}
              onClick={handleInputClick}
              onBlur={inputBlur}
              className ={"doubleLine"}
            />
          );
        },
      },
    ],
    [checkColumn,handleCheckboxChange] //checkColum 변경시마다 check해제 되도록
  );

  




  const columnsModal = useMemo(
    () => [
      {
        Header: "사원코드",
        accessor: "cdEmp",
        width: "45%",
        id: "cdEmp",
        Cell: ({ cell: { value }, row: { original } }) => {
          const handleInputClick = (e) => {
            console.log(e.target.value);
            setClickModalEmpCode(original.cdEmp);
          };
          return (
            <Input
              value={original?.cdEmp || ""}
              onClick={handleInputClick}
              className={"doubleLine"}
            />
          );
        },
      },
      {
        Header: "사원명",
        accessor: "nmEmp",
        id: "nmEmp",
        Cell: ({ cell: { value }, row: { original } }) => {
          const handleInputClick = (e) => {
            console.log(e.target.value);
            setClickModalEmpCode(original.cdEmp);
          };
          return (
            <Input
              value={original?.nmEmp || ""}
              onClick={handleInputClick}
              className={"doubleLine"}
            />
          );
        },
      },
      {
        Header: "주민번호",
        accessor: "noResident",
        id: "noResident",
        Cell: ({ cell: { value }, row: { original } }) => {
          const handleInputClick = (e) => {
            console.log(e.target.value);
            setClickModalEmpCode(original.cdEmp);
          };
          return (
            <Input
              value={original?.noResident || ""}
              onClick={handleInputClick}
              className={"doubleLine"}
            />
          );
        },
      },
    ],
    [modalEmpList],
  );
  
  




    return (
      <>
        <div className="searchBar">
          <div className="innerBox fxSpace">
            <div className="selectWrapper">
              
              <div className="searchBarName">작성년월</div>
              <CustomCalendar
                    width="150"
                    type="month"
                    value={belongingDate}
                    onChange={handleBelongingDateChange}
                  />
              
             
                

                <SearchBarBox
                  label="정렬"
                  id="wc-order"
                      options={[
                        { value: '1', label: '사원코드 순' },
                        { value: '2', label: '사원이름 순' },
                        
                      ]}
                      defaultValue="1"
                      onChange={searchOrderOption}
                      
                    />

             
            </div>
            {/* <div className="btnWrapper">
            <SearchSubmitButton onClick={conditionSearch} text="조회" />
            </div> */}
          </div>
        </div>


        
        <section className="section">
          <div className="wcGridContainer">
            <div className="wcGridCellItem1">
              <div className="namePickerBox">
              <Table
                columns={columns}
                data={data}   
                checkboxWidth={"10%"}
                insertRow={true} //table 추가하기 on of
                showInsertRow={showInsertRow}
                setShowInsertRow={setShowInsertRow}
                />
              </div>
              <table className="wcBottomTable">
              <tbody>
                <tr>
                  <td>조회된 사원</td>
                  <td>{data.length}명</td>
                </tr>
              </tbody>
          
              </table>
            </div>

            <div className="wcGridCellItem2">
              <h1 className="wcRightHead">근로계약서</h1>
              <table className="wcRightGridTable">
                <tr>
                  <td className="wcRightGridTableLeftTd"> 근로계약기간  </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomCalendar 
                    width="180" 
                    id={"dtStartCont"}
                    value={paramGetEmpList1.dtStartCont}
                    onChange={contractPeriodCalendar1}
                    
                    
                     /> 
                  </td>
                  <td className="wcRightGridTableRightTd2">
                    <CustomCalendar 
                    width="180" 
                    id={"dtEndCont"}
                    value={paramGetEmpList1.dtEndCont}
                    onChange={contractPeriodCalendar2}

                    />
                  </td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd">근무장소  </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomInput 
                    placeholder={" 주소검색을 눌러주세요 "}
                    value={paramGetEmpList1.noWorkPost|| ""}
                    id={"noWorkPost"}
                    readOnly
                    onChange={inputOnChange}
                    width={180}
                     />
                  </td>
                  <td className="wcRightGridTableRightTd2">
                    <CustomInput 
                    width={415}
                    id={"addrWork"}
                    onChange={inputOnChange}
                    value={paramGetEmpList1.addrWork || "" }
                    readOnly
                    />

                    <CustomButton
                      className="wcRightCellSearchButton"
                      text="주소검색"
                      color="black"
                      onClick={addrButtonClick}
                    />

                  </td>

                  <td className="wcRightGridTableRightTd3">
                    
                  </td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd">상세주소  </td>
                  <td className="wcRightGridTableRightTd1" colSpan="2">
                    <CustomInput 
                    width={605} 
                    value={paramGetEmpList1.addrWorkDtl || ""}
                    id={"addrWorkDtl"}
                    onChange={inputOnChange}
                    onBlur={inputOnBlur}
                    maxLength="100"
                    placeholder={"ex) 더존 APT 1동 101호 "}

                     />
                  </td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd">업무의 내용 </td>

                  <td className="wcRightGridTableRightTd1" colSpan="2">
                    <CustomInput 
                    width="605"
                    value={paramGetEmpList1.cntnJob||""}
                    id={"cntnJob"}
                    onChange={inputOnChange}
                    onBlur={inputOnBlur}
                    maxLength="100"
                    placeholder={"ex) Platform 부서 refactoring 업무 "}

                    />
                  </td>
                </tr>
               
                <tr>
                  <td className="wcRightGridTableLeftTd">소정근로시간 </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomInput 
                    value={paramGetEmpList1.tmStartRegularWork||""}
                    id={"tmStartRegularWork"}
                    onChange={inputOnChange}
                    onBlur={inputOnBlur}
                    maxLength="4"
                    placeholder={"ex) 0900 "}
                    width={180}
                    
                    
                    >
                      
                    </CustomInput>
                  </td>
                  <td className="wcRightGridTableRightTd2">
                    <CustomInput
                    value={paramGetEmpList1.tmEndRegularWork || "" }
                    id={"tmEndRegularWork"}
                    onChange={inputOnChange}
                    onBlur={inputOnBlur}
                    maxLength="4"
                    placeholder={"ex) 1800 "}
                   
                    >
                    </CustomInput>

                  </td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd">휴게시간 </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomInput
                     value={paramGetEmpList1.tmStartBreak || "" }
                     id={"tmStartBreak"}
                    onChange={inputOnChange}
                    onBlur={inputOnBlur}
                    maxLength="4"
                    placeholder={"ex) 1200 "}
                    width={180}



                    >

                    </CustomInput>
                  </td>

                  <td className="wcRightGridTableRightTd2">
                    <CustomInput
                     value={paramGetEmpList1.tmEndBreak || "" }
                    id={"tmEndBreak"}
                    placeholder={"ex) 1300 "}

                     onChange={inputOnChange}
                     onBlur={inputOnBlur}
                     maxLength="4"


                    ></CustomInput>
                  </td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd">근무일  </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomSelect
                      
                      options={[
                        { value: '0', label: ' 미작성 ' },
                        { value: '1', label: '1주에 1일' },
                        { value: '2', label: '1주에 2일' },
                        { value: '3', label: '1주에 3일' },
                        { value: '4', label: '1주에 4일' },
                        { value: '5', label: '1주에 5일' },
                        { value: '6', label: '1주에 6일' },
                        { value: '7', label: '1주에 7일' },
                      ]}
                      value={paramGetEmpList1.ddWorking || "0" }
                      id={"ddWorking"}
                     
                     onChange={inputOnChange}
                     className={"wcSelect1"}
                      
                    />
                  </td>
                  <td className="wcRightFirstTableRightTd2"></td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd">주휴일 </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomSelect
                      options={[
                        { value: '0', label: ' 미작성 ' },
                        { value: '1', label: '매주 월요일' },
                        { value: '2', label: '매주 화요일' },
                        { value: '3', label: '매주 수요일' },
                        { value: '4', label: '매주 목요일' },
                        { value: '5', label: '매주 금요일' },
                        { value: '6', label: '매주 토요일' },
                        { value: '7', label: '매주 일요일' },
                      ]}
                      value={paramGetEmpList1.dotw || "0" }

                      id={"dotw"}
                     onChange={inputOnChange}
                     className={"wcSelect1"}

                    
                    />
                  </td>
                  <td className="wcRightFirstTableRightTd2"></td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd">임금유형 </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomSelect
                      options={[
                        { value: '0', label: ' 미작성 ' },
                        { value: '1', label: ' 월급 ' },
                        { value: '2', label: ' 일급 ' },
                        { value: '3', label: ' 시급 ' },
                      ]}
                      value={paramGetEmpList1.tpSal||"0" }
                    
                      id={"tpSal"}
                     onChange={inputOnChange}
                     className={"wcSelect2"}

        
                    />
                  </td>
                  <td className="wcRightGridTableRightTd2">
                    <CustomInput 
                    className={"wcSelect2"}
                    value={paramGetEmpList1.amtSal || "" }
                    id ={"amtSal"}
                    onChange={inputOnChange}
                    onBlur={inputOnBlur}
                    maxLength="11"
                    placeholder={"ex) 10000000"}
                    type={"number"}
                     /> 
                    <b>원</b>
                  </td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd">임금지급일 </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomSelect
                      options={[
                        { value: '0', label: ' 미작성 ' },
                        { value: '1', label: ' 매월 ' },
                        { value: '2', label: ' 매주 ' },
                        { value: '3', label: ' 매일 ' },
                      ]}
                      value={paramGetEmpList1.tpPayDtSal || "0" }
                     className={"wcSelect2"}
                      id={"tpPayDtSal"}
                    onChange={inputOnChange}
                    
                    />
                  </td>

                  <td className="wcRightGridTableRightTd2">
                    <CustomInput 
                    value={paramGetEmpList1.ddPaySal || "" }
                    id ={"ddPaySal"}
                    onChange={inputOnChange}
                    onBlur={inputOnBlur}
                    maxLength="2"
                    className={`wcSelect2 ${payState === "off" ? "wcPayDayOff" : ""} `}
                    placeholder={"ex) 17"}
                    type={"number"}
                    />
                    <b
                    className={`${payState === "off" ? "wcPayDayOff" : ""} `}
                    >일</b>
                  </td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd">지급방법  </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomSelect

                      options={[
                        { value: '0', label: ' 미작성 ' },
                        { value: '1', label: ' 예금통장에 입금 ' },
                        { value: '2', label: ' 직접지급 ' },
                      ]}
                      value={paramGetEmpList1.methodPay || "0" }
                      id={`methodPay`}
                      
                     onChange={inputOnChange}
                   

                    />
                  </td>
                  <td className="wcRightGridTableRightTd2"></td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd"> 고용보험  </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomSelect
                      options={[
                        { value: '0', label: ' 미작성 ' },
                        { value: '1', label: ' 여 ' },
                        { value: '2', label: ' 부 ' },
                      ]}
                      value={paramGetEmpList1.ynEmpInsurance || "0" }
                      id={"ynEmpInsurance"}
                      
                      onChange={inputOnChange}
                    

                      className="wcSelect3"
                    />
                  </td>
                  <td className="wcRightGridTableRightTd2"></td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd"> 산재보험  </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomSelect
                      options={[
                        { value: '0', label: ' 미작성 ' },
                        { value: '1', label: ' 여 ' },
                        { value: '2', label: ' 부 ' },
                      ]}
                      value={paramGetEmpList1.ynIndustrialAccidentInsurance || "0" }
                      id={"ynIndustrialAccidentInsurance"}
                    
                      onChange={inputOnChange}
                    

                      className="wcSelect3"
                    />
                  </td>
                  <td className="wcRightGridTableRightTd2"></td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd"> 국민연금  </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomSelect
                      options={[
                        { value: '0', label: ' 미작성 ' },
                        { value: '1', label: ' 여 ' },
                        { value: '2', label: ' 부 ' },
                      ]}
                      value={paramGetEmpList1.ynNationalPension || "0" }
                      id={"ynNationalPension"}
                      onChange={inputOnChange}
                      

                      className="wcSelect3"
                    />
                  </td>
                  <td className="wcRightFirstTableRightTd2"></td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd"> 건강보험  </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomSelect
                      options={[
                        { value: '0', label: ' 미작성 ' },
                        { value: '1', label: ' 여 ' },
                        { value: '2', label: ' 부 ' },
                      ]}
                      value={paramGetEmpList1.ynHealthInsurance || "0" }
                      id={"ynHealthInsurance"}
                      
                      onChange={inputOnChange}
                   

                      className="wcSelect3"
                    />
                  </td>
                  <td className="wcRightFirstTableRightTd2"></td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd"> 서명여부  </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomSelect
                      options={[
                        { value: '0', label: ' 미작성 ' },
                        { value: '1', label: ' 여 ' },
                        { value: '2', label: ' 부 ' },
                      ]}
                      value={paramGetEmpList1.stSign||"0"}
                      id={"stSign"}
                      
                      onChange={inputOnChange}
                      
                      className="wcSelect3"
                    />
                  </td>
                  <td className="wcRightFirstTableRightTd2"></td>
                </tr>
                <tr>
                  <td className="wcRightGridTableLeftTd">작성일자 </td>
                  <td className="wcRightGridTableRightTd1">
                    <CustomCalendar
                    className={'wcCreatedDateCalander'} 
                    width="180" 
                    id="createDate"
                    value={paramGetEmpList1.dtCreated || "" }

                    name={"dtCreated"}
                    onChange={contractPeriodCalendar3}
                     

                    />
                  </td>
                  <td className="wcRightGridTableRightTd2"></td>
                </tr>
                
              </table>
              
            </div>
          </div>

         {/* 모달 창 
         
         onClick={(e) => e.stopPropagation()}
         
         */}
         
         {openPostcode && (
          <div className="wcModal1" onClick={closeModal}>
            <div className="wcModal2"  onClick={(e) => e.stopPropagation()}> 
              <DaumPostcode 
                style={{ height: "100%" }}
                onComplete={handleAddressSelect}  
                autoClose={false} 
                
              />
            </div>
          </div>
        )}




        </section>

        <CustomModal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        contentStyle={{
          backgroundColor: "white",
          border: "1px solid gray",
        }}
      >
        <PageHeaderName text="추가목록" />
        <div className="test2">
          <Table columns={columnsModal} data={dataModalEmpList} />
        </div>
        <div className="test">
          <CustomButton
            backgroundColor={"var(--color-primary-blue)"}
            color={"var(--color-primary-white)"}
            onClick={closeModalAndEmpInsert}
            text={"추가하기"}
          />
          <CustomButton
            backgroundColor={"var(--color-primary-gray)"}
            color={"var(--color-primary-white)"}
            onClick={closeModal2}
            text={"취소"}
          />
        </div>
      </CustomModal>


        {/* 공통 sweetalert  */}
      {showAlert && (
        <SweetAlert
          text="시작 근로계약 기간은 종료 근로계약 기간보다 빠를 수 없습니다 ?"
          
          //type="success"
          type="warning"
          //type="error"
          //type="question"
          onConfirm={() => {
            
            setShowAlert(false)
          }}
          
        />
      )}

        {showAlert2 && (
        <SweetAlert
          text="종료 근로계약 기간은 시작 근로계약 기간보다 늦을 수 없습니다.."
          // showCancel={true}
          //type="success"
          type="warning"
          //type="error"
          //type="question"
          onConfirm={() => {
            setShowAlert2(false)
          }}
          
        />
          )}
        
        {showAlert3 && (
        <SweetAlert
          text="시간은 4자리로 작성해야 합니다."
          // showCancel={true}
          //type="success"
          type="warning"
          //type="error"
          //type="question"
          onConfirm={() => {
            setShowAlert3(false)
          }}
          
        />
          )}

{showAlert4 && (
        <SweetAlert
          text="60분을 초과할 수 없습니다."
          // showCancel={true}
          //type="success"
          type="warning"
          //type="error"
          //type="question"
          onConfirm={() => {
            setShowAlert4(false)
          }}
          
        />
          )}

{showAlert5 && (
        <SweetAlert
          text="종료시간은 시작시간보다 빠를 수 없습니다."
          // showCancel={true}
          //type="success"
          type="warning"
          //type="error"
          //type="question"
          onConfirm={() => {
            setShowAlert5(false)
          }}
          
        />
          )}

{showAlert6 && (
        <SweetAlert
          text="종료시간은 시작시간보다 빠를 수 없습니다."
          // showCancel={true}
          //type="success"
          type="warning"
          //type="error"
          //type="question"
          onConfirm={() => {
            setShowAlert6(false)
          }}
          
        />
          )}

{showAlert7 && (
        <SweetAlert
          text="휴식시간은 근무시간 범위에 있어야 합니다."
          // showCancel={true}
          //type="success"
          type="warning"
          //type="error"
          //type="question"
          onConfirm={() => {
            setShowAlert7(false)
          }}
          
        />
          )}






      </>
    );
  }


export default WorkContractCreate;