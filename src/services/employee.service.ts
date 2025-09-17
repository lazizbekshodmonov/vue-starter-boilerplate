import httpClient from "@/shared/api/httpClient.ts";
import type { IBaseResponse } from "@/types/global";
import type { IEmployeeForm } from "@/types/ui/employees";

class EmployeeService {
  async create(form: IEmployeeForm) {
    await httpClient<IBaseResponse>({
      url: "/admin/roles",
      method: "POST",
      data: form,
    });
  }

  async update(pinfl: string, form: Partial<IEmployeeForm>) {
    await httpClient<IBaseResponse>({
      url: `admin/roles/${pinfl}`,
      method: "PUT",
      data: form,
    });
  }
  async delete(pinfl: string) {
    await httpClient<IBaseResponse>({
      url: `admin/roles/${pinfl}`,
      method: "DELETE",
    });
  }
}

const employeeService = new EmployeeService();

export default employeeService;
