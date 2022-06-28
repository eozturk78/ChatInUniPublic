export class Enums {


  public static MethodType =
    {
      POST: 'POST',
      GET: 'GET',
      DELETE: 'DELETE',
      PUT: 'PUT'
    };

  public static RecordSources =
    {
      Customer: 10,
      Transporter: 20,
      Driver: 30,
      Vehicle: 40
    };

  public static ListPages = {
    Dashboard: 10,
    ShiftPlanList: 20,
    UserList: 50,
    LanguageList: 140,
    StaticTranslations: 150,
    DynamicTranslations: 160,
    EnumTranslations: 170,
    FileTypeList: 180,
    CountryList: 190,
    MessageAccountList: 200,
    MessageTemplateList: 210,
    ServiceList: 220,
    EndpointList: 230,
    APIMessageList: 240,
  };

}
