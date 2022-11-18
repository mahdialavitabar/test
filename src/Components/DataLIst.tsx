import moment from "jalali-moment";

export interface Data {}

export type DataProps = {
  data: any;
};

const DataList = ({ data }: DataProps) => {
  
  
  
  return (
    <div className="mt-2">
      {Object.keys(data).map((i) => (
        <div key={i} className="text-center flex flex-col items-center">
          <div className="bg-gray-500 p-2 text-white">{i}</div>
          {data[i].map((item:any,idx:number)=>(
            <div className="border-1 m-2 bg-pink-100 text-center w-full  rounded-2xl p-4" key={idx}>{Object.keys(item).map((i,index)=>{
              return i === "hub"?
              // @ts-ignore
              <p key={index}>{item[i["title"]]}</p>
              :
                <p key={index}>
                  
                  { i=== "created_at" || i=== "request_datetime" || i === "datetime"?moment(item[i])
      .locale("fa")
      .format("YYYY/MM/DD"):
                  item[i]}</p>
            })}</div>
          ))}
          
        </div>
      ))}
    </div>
  );
};

export default DataList;
