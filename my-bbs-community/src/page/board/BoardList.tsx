import type React from "react";
import { useEffect, useState } from "react";
import type { boardDTO } from "../../types/Community";
import { boardApi } from "../../api/communityApi";

const BoardList: React.FC = () => {
  const [list, setList] = useState<boardDTO>();

  return <div></div>;
};

export default BoardList;
