import ResDto from "./res_dto";
import { OperationStatus } from "./util_types";
import { NextApiResponse } from "next";

export function httpResponse(r: ResDto<unknown>, res: NextApiResponse) {
  try {
    switch (r.status) {
      case OperationStatus.success:
        res.status(200).json(r);
        break;
      case OperationStatus.fail:
        res.status(400).json(r);
        break;
      case OperationStatus.notfound:
        res.status(404).json(r);
        break;
      default:
        res.status(500).json(r);
    }
  } catch (error) {
    console.log(`Error Returning HTTP Response: ${error}`);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
