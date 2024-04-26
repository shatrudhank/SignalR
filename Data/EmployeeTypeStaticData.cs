using SignalR.Constant;

namespace SignalR.Data
{
    public static class EmployeeStaticData
    {
        public static Dictionary<EmployeeType, int> EmployeeTypes;
        static EmployeeStaticData()
        {
            EmployeeTypes = new Dictionary<EmployeeType, int>();
            EmployeeTypes[EmployeeType.Permanent] = 0;
            EmployeeTypes[EmployeeType.Contract] = 0;
        }

    }
}
