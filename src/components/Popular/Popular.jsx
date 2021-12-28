import {Corousel} from '../';
function Popular({ data, type }) {
  return (
    <div className="py-2">
      <h2 className="border-bottom border-1 pb-2">
        Popular {type}
      </h2>
      <Corousel data={data} type={type} />
    </div>
  );
}

export default Popular;
