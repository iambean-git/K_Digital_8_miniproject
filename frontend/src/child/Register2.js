
import "./checkbox.css";

import TailButton from "../UI/TailButton";
import CardInfoSmall from '../UI/CardInfoSmall';
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import axios from 'axios';


export default function Register2({ info }) {
    const memEmail = localStorage.getItem("memEmail");

    //테이블 Tr 만들기
    const [vacTrs, setVacTrs] = useState('');

    // 체크된 목록
    const [checkedList, setCheckedList] = useState([]);

    const vaccineList = [
        { disease: "결핵", code: "BCG", idx: [1], optional: "필수접종" },
        { disease: "수두", code: "VAR", idx: [2], optional: "필수접종" },
        { disease: "폴리오", code: "IPV", idx: [3, 4, 5, 6], optional: "필수접종" },
        { disease: "일본뇌염", code: "IJEV", idx: [7, 8, 9, 10, 11], optional: "필수접종" },
        { disease: "일본뇌염", code: "LJEV", idx: [12, 13], optional: "필수접종" },
        { disease: "폐렴구균", code: "IJEV", idx: [14, 15, 16, 17], optional: "필수접종" },
        { disease: "폐렴구균", code: "PPSV", idx: [18], optional: "필수접종" },
        { disease: "인플루엔자", code: "IIV", idx: [19], optional: "필수접종" },
        { disease: "로타바이러스", code: "RV1", idx: [20, 21], optional: "필수접종" },
        { disease: "로타바이러스", code: "RV5", idx: [22, 23, 24], optional: "필수접종" },
        { disease: "디프테리아, 파상풍, 백일해", code: "DTaP", idx: [27, 28, 29, 30, 31], optional: "필수접종" },
        { disease: "홍역, 유행성이하선염, 풍진", code: "MMR", idx: [33, 34], optional: "필수접종" },
        { disease: "A형간염", code: "HepA", idx: [35, 36], optional: "필수접종" },
        { disease: "b형 헤모필루스 인플루엔자", code: "Hib", idx: [37, 38, 39, 40], optional: "필수접종" },
        { disease: "B형간염", code: "HepB", idx: [41, 42, 43], optional: "필수접종" },
        { disease: "사람유두종바이러스 감염증", code: "HPV", idx: [25, 26], optional: "선택접종" },
        { disease: "디프테리아, 파상풍, 백일해", code: "TdaP/Td", idx: [32], optional: "선택접종" }
    ]

    useEffect(() => {
        makeTable();
    }, []);

    const makeTable = () => {
        const tags = vaccineList.map(item =>
            <tr className="bg-white border-b" key={item.idx[0]}>
                <th scope="row" className="px-2 py-4 font-medium text-gray-900 "><CardInfoSmall text={item.optional} type="short" /></th>
                <td className="px-6 py-4">{item.disease}</td>
                <td className="px-6 py-4">{item.code}</td>
                <td className="px-6 py-4 flex">{item.idx.map(idx =>
                    <div className="round w-[28px] h-[28px] mx-1 " key={idx}>
                        <input id={"check" + idx} type="checkbox" value={idx}
                            onClick={(e) => handleCheck(e.target.checked, e.target.value)}
                        />
                        <label htmlFor={"check" + idx} ></label>
                    </div>
                )}</td>
            </tr>
        );

        setVacTrs(tags);
        // console.log("tags:", tags);
    }

    const handleCheck = (checked, id) => {
        console.log("checked : ", checked);
        console.log("checked : ", id);

        if (checked) {
            setCheckedList((prev) => [...prev, id]);
        } else {
            setCheckedList((prev) => prev.filter((i) => i !== id));
        }
    }

    useEffect(() => {
        console.log("checkedList : ", checkedList);
    }, [checkedList])

    const handleNext = async (e) => {
        e.preventDefault();
        // let url = "10.125.121.214:8080/registerChild?childName=aa&member=chan@naver.com&vaccine=1";
        let url = "http://10.125.121.214:8080/registerChild";

        const formData = new FormData();
        formData.append("childName",info.name);
        formData.append("member", memEmail);
        formData.append("birth", info.birth);
        formData.append("file", info.file);
        const childData = {
            method: 'POST',
            headers: {
              // 'Content-Type': 'multipart/form-data'
            },
            body : formData,
        }
        console.log("===== fetch ====== ");

        const resp = await fetch(url, childData);
        const data = await resp.json();
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }

        putVaccineList(data.idx);
    }

    const putVaccineList = async (idx) => {
        checkedList.sort((a, b) => a - b);
        console.log("checkedList", checkedList);

        let vaccine_idxs = ""
        checkedList.forEach(idx => { vaccine_idxs = vaccine_idxs + idx + "," })
        console.log("vaccine_idxs", vaccine_idxs);

        let url = "http://10.125.121.214:8080/selectVaccine?";
        url = `${url}child_idx=${idx}&vaccine_idx=${vaccine_idxs}`

        console.log("put URL : ", url);
        const VaccineListData = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const resp = await fetch(url, VaccineListData);
        if (resp.ok) window.location.href = "/child";
    }

    return (
        <div className="w-[800px] h-full flex flex-col justify-start items-center py-12">
            <div>
                <div>
                    2단계
                </div>
                <div>
                    아이의 접종 정보를 입력해주세요.
                </div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                구분
                            </th>
                            <th scope="col" className="px-6 py-3">
                                예방 접종명
                            </th>
                            <th scope="col" className="px-6 py-3">
                                백신명
                            </th>
                            <th scope="col" className="px-6 py-3">
                                횟수
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {vacTrs}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-center mt-[10px]">
                <TailButton caption={'다음'} color={'blue'} handleClick={handleNext}
                    style={'w-[360px] h-12 text-[14px] '} />
            </div>
        </div>
    )
}
