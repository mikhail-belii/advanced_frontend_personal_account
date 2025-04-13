import { BaseDictionaryDto, DepartmentDto, EmploymentTypesEnum } from "../../pages/CertificatesPage/CertificatesPage"
import EmployeePostExpCard from "../EmployeePostExpCard/EmployeePostExpCard"
import EmployeePostCard from "../EmployeePostCard/EmployeePostCard"

export interface IEmployeePost {
    id: string,
    rate: number,
    departments?: DepartmentDto[],
    postType: BaseDictionaryDto,
    postName: BaseDictionaryDto,
    dateStart?: string,
    dateEnd?: string,
    employmentType: EmploymentTypesEnum,
}

export type Experience = {
    id: string,
    years: number,
    months: number,
    type?: string
}

export interface IEmployee {
    id: string,
    experience: Experience[],
    posts?: IEmployeePost[]
}

const EmployeeCard = ({...props}: IEmployee) => {
    return (
        <>
            <EmployeePostExpCard props={props.experience}/>
            {props.posts && props.posts.map((post, index) => (
                <EmployeePostCard key={index} {...post}/>
            ))}
        </>
    )
}

export default EmployeeCard