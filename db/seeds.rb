class Seeder
  def self.round_up(number)
    divisor = 10**Math.log10(number).floor
    i = number / divisor
    remainder = number % divisor
    if remainder == 0
      i * divisor
    else
      (i + 1) * divisor
    end
  end
end

ActiveRecord::Base.connection.execute("INSERT INTO roles ( name, resource_type, resource_id, created_at, updated_at) VALUES ('admin', null, null, '2020-03-20 03:28:35.477567', '2020-03-20 03:28:35.477567');")
ActiveRecord::Base.connection.execute("INSERT INTO roles ( name, resource_type, resource_id, created_at, updated_at) VALUES ('client', null, null, '2020-03-20 03:28:35.731160', '2020-03-20 03:28:35.731160');")
ActiveRecord::Base.connection.execute("INSERT INTO roles ( name, resource_type, resource_id, created_at, updated_at) VALUES ('director', null, null, '2020-03-20 03:28:35.959310', '2020-03-20 03:28:35.959310');")
ActiveRecord::Base.connection.execute("INSERT INTO roles ( name, resource_type, resource_id, created_at, updated_at) VALUES ('employee', null, null, '2020-03-20 03:28:36.187587', '2020-03-20 03:28:36.187587');")
ActiveRecord::Base.connection.execute("INSERT INTO roles ( name, resource_type, resource_id, created_at, updated_at) VALUES ('manager', null, null, '2020-03-20 03:28:36.413612', '2020-03-20 03:28:36.413612');")
ActiveRecord::Base.connection.execute("INSERT INTO roles ( name, resource_type, resource_id, created_at, updated_at) VALUES ('observer', null, null, '2020-03-20 03:28:36.651298', '2020-03-20 03:28:36.651298');")
ActiveRecord::Base.connection.execute("INSERT INTO roles ( name, resource_type, resource_id, created_at, updated_at) VALUES ('support', null, null, '2020-03-20 03:28:36.651298', '2020-03-20 03:28:36.651298');")

ActiveRecord::Base.connection.execute(IO.read(Rails.root.join("db", "data", "resolutions.sql")))

%w[manager observer director employee client q_and_a_forbidden q_and_a_read_only support].each do |role|
  roles = ActiveRecord::Base.connection.execute("select id from roles where name like '#{role}'").first
  if roles.present?
    role_id = roles["id"]
    resolutions = ActiveRecord::Base.connection.execute("select id from resolutions where json_data->'roles'= '[]'::jsonb OR json_data->'roles' @> '[\"#{role}\"]'::jsonb")
    resolutions.each do |resolution|
      ActiveRecord::Base.connection.execute("INSERT INTO \"resolutions_roles\" (role_id, resolution_id) VALUES (#{role_id}, #{resolution["id"]})")
    end
  end
end

# Создание админа
users = [
  {name: "admin", login: "admin", email: "admin@yandex.ru", password: "1", password_confirmation: "1", role: "admin"}
]
users.each do |user|
  uzer = User.create(user)
  uzer.roles << Role.find_by(name: :admin)
end

currencies = [
  {name: "Тенге", symbol: "T", iso4217_code: "KZT", iso4217_num: 398, unicode_code: '\u20BD', decimal_code: "&#8376;", hexadecimal_code: "&#x20B8;", fmt: "kz-KZ"},
  {name: "Рубль", symbol: "руб.", iso4217_code: "RUB", iso4217_num: 643, unicode_code: '\u20B8', decimal_code: "&#8381;", hexadecimal_code: "&#x20BD;", fmt: "ru-RU"},
  {name: "Бел. рубль", symbol: "p.", iso4217_code: "BYN", iso4217_num: 933, unicode_code: '\u20B8', decimal_code: "&#8381;", hexadecimal_code: "&#x20BD;", fmt: "be-BE"}
]
currencies.each do |currency|
  Currency.create(currency)
end

operators = [
  {name: "tele2", title: "ТЕЛЕ2", kind: 1},
  {name: "other", title: "Другие", kind: 1},
  {name: "beeline", title: "Билайн", kind: 1},
  {name: "mts", title: "МТС", kind: 1},
  {name: "megafon", title: "Мегафон", kind: 1},
  {name: "Yota", title: "Йота", kind: 1},
  {name: "motiv", title: "Мотив", kind: 1},
  {name: "", title: "", kind: 1},
  {name: "total_orders", title: "total_orders", kind: 2},
  {name: "заказ", title: "заказ", kind: 2},
  {name: "viber", title: "Вайбер", kind: 1}

]
operators.each do |item|
  Operator.create(item)
end

countries = [
  {id: 675, name: "Абхазия"},
  {id: 676, name: "Австрия"},
  {id: 649, name: "Азербайджан"},
  {id: 677, name: "Армения"},
  {id: 651, name: "Беларусь", currency: Currency.find_by(name: "Зайчики")},
  {id: 654, name: "Болгария"},
  {id: 655, name: "Великобритания"},
  {id: 653, name: "Германия"},
  {id: 652, name: "Грузия"},
  {id: 681, name: "Дагестан"},
  {id: 657, name: "Зимбабве"},
  {id: 656, name: "Египет"},
  {id: 658, name: "Израиль"},
  {id: 659, name: "Испания"},
  {id: 678, name: "Ингушетия"},
  {id: 679, name: "Иран"},
  {id: 398, name: "Казахстан", phone_code: "+7", currency: Currency.find_by(name: "Тенге")},
  {id: 660, name: "Колумбия"},
  {id: 680, name: "Кот-д’Ивуар"},
  {id: 647, name: "Кыргызстан"},
  {id: 692, name: "Корея"},
  {id: 661, name: "Латвия"},
  {id: 662, name: "Литва"},
  {id: 682, name: "Македония"},
  {id: 663, name: "Мексика"},
  {id: 664, name: "Молдова"},
  {id: 665, name: "Монголия"},
  {id: 691, name: "Нидерланды"},
  {id: 666, name: "Польша"},
  {id: 643, name: "РФ", phone_code: "+7", currency: Currency.find_by(name: "Рубль")},
  {id: 685, name: "Словения"},
  {id: 667, name: "США"},
  {id: 648, name: "Таджикистан"},
  {id: 668, name: "Туркменистан"},
  {id: 669, name: "Турция"},
  {id: 646, name: "Узбекистан"},
  {id: 670, name: "Украина"},
  {id: 687, name: "Уругвай"},
  {id: 686, name: "Черногория"},
  {id: 672, name: "Чехия"},
  {id: 673, name: "Швейцария"},
  {id: 683, name: "Швеция"},
  {id: 671, name: "Финляндия"},
  {id: 684, name: "Франция"},
  {id: 674, name: "Эстония"},
  {id: 690, name: "Эфиопия"}
]
countries.each do |country|
  Country.create!(country)
end

legal_enteties = [
  {
    name: "ООО Компания 1",
    inn: "1111111111",
    kpp: "111111111",
    address: "адрес с почтовым индексом",
    checking_account: "",
    bank_name: "ПАО МОЙ-БАНК",
    bik: "111111111",
    account: "111111111111111111111",
    director_name: "Директор И.О.",
    director_name_sign: "",
    bank_account: "11111111111111111111",
    phone: "",
    accountant: "Бухгалтер И.О.",
    stamp_url: "stamps/1/stamp.png"
  },
  {
    name: "ООО Компания 2",
    inn: "22222222222",
    kpp: "222222222",
    address: "адрес с почтовым индексом",
    checking_account: "",
    bank_name: "ПАО НАШ-БАНК",
    bik: "222222222",
    account: "2222222222222222222222",
    director_name: "Директор И.О.",
    director_name_sign: "",
    bank_account: "2222222222222222222",
    phone: "",
    accountant: "Бухгалтер И.О.",
    stamp_url: "stamps/2/stamp.png"
  },
  {
    name: "ООО Компания 3",
    inn: "3333333333",
    kpp: "333333333",
    address: "адрес с почтовым индексом",
    checking_account: "",
    bank_name: "ПАО ВАШ-БАНК",
    bik: "333333333",
    account: "333333333333333333333",
    director_name: "Директор И.О.",
    director_name_sign: "",
    bank_account: "3333333333333333333",
    phone: "",
    accountant: "Бухгалтер И.О.",
    stamp_url: "stamps/3/stamp.png"
  }
]
legal_enteties.each do |legal_entity|
  LegalEntity.create!(legal_entity)
end

services = [
  {
    currency_id: 2,
    legal_entity_id: LegalEntity.find(1).id,
    name: "SMS",
    state: "active",
    alert_template_email: "<p>SMS</p>",
    alert_template_sms: "SMS",
    notify_expires_days: 7,
    ticket: {"tariff" => "sms", "kind" => "sms_gate", "can_suspend" => true, "count_balance" => true, "count_statistic" => true, "allow_subscribe" => true, "require_submit_client" => true},
    tariffs_count: 0,
    agreement: nil
  },
  {
    currency_id: 2,
    legal_entity_id: LegalEntity.find(2).id,
    name: "Техподдержка",
    state: "active",
    alert_template_email: "<p>Техподдержка</p>",
    alert_template_sms: "Техподдержка",
    notify_expires_days: 7,
    ticket: {"tariff" => "tehsupport",
             "kind" => "tech_support",
             "can_suspend" => true,
             "count_balance" => true,
             "allow_subscribe" => true,
             "require_submit_client" => true,
             "tms" => {
               "alert_template_email" => "Alert",
               "alert_template_sms" => "Алерт"
             }},
    tariffs_count: 0,
    agreement: nil
  },
  {
    currency_id: 1,
    legal_entity_id: LegalEntity.find(3).id,
    name: "Техподдержка KZ",
    state: "active",
    alert_template_email: "<p>Техподдержка KZ</p>",
    alert_template_sms: "Техподдержка KZ",
    notify_expires_days: 7,
    ticket: {
      "tariff" => "tehsupport_kz",
      "kind" => "tech_support",
      "can_suspend" => true,
      "count_balance" => true,
      "allow_subscribe" => true,
      "require_submit_client" => true
    },
    tariffs_count: 0,
    agreement: nil
  },
  {
    currency_id: 1,
    legal_entity_id: LegalEntity.find(3).id,
    name: "SMS KZ",
    state: "active",
    alert_template_email: "<p>SMS KZ<p>",
    alert_template_sms: "SMS KZ",
    notify_expires_days: 7,
    ticket: {"tariff" => "sms_kz", "kind" => "sms_gate", "can_suspend" => true, "count_balance" => true, "count_statistic" => true},
    tariffs_count: 0,
    agreement: nil
  },
  {currency_id: 2,
   legal_entity_id: LegalEntity.find(2).id,
   name: "ПО Друг",
   state: "active",
   alert_template_email: "<p>ПО Друг</p>",
   alert_template_sms: "ПО Друг",
   notify_expires_days: 7,
   ticket: {"tariff" => "po_drug", "kind" => "custom", "can_suspend" => true, "count_balance" => true},
   tariffs_count: 0,
   agreement: nil},
  {currency_id: 1,
   legal_entity_id: LegalEntity.find(3).id,
   name: "ПО Друг KZ",
   state: "new",
   alert_template_email: "<p>ПО Друг KZ</p>",
   alert_template_sms: "ПО Друг KZ",
   notify_expires_days: 7,
   ticket: {"tariff" => "po_drug_kz", "kind" => "custom", "can_suspend" => true},
   tariffs_count: 0,
   agreement: nil},
  {currency_id: 2,
   legal_entity_id: LegalEntity.find(2).id,
   name: "Продвижение сервиса Taxophone",
   state: "active",
   alert_template_email: "<p>Сервис таксофона</p>",
   alert_template_sms: "Сервис таксофона",
   notify_expires_days: 7,
   ticket: {tariff: "taxophone_distribution", kind: "custom", can_suspend: true, count_balance: true},
   tariffs_count: 0,
   agreement: nil},
  {
    currency_id: 2,
    legal_entity_id: LegalEntity.find(2).id,
    name: "Голосовой робот",
    state: "active",
    alert_template_email: "<p>Голосовой робот</p>",
    alert_template_sms: "Голосовой робот",
    notify_expires_days: 7,
    ticket: {"tariff" => "voice_robot", "kind" => "calls_bot", "can_suspend" => true, "count_balance" => true, "count_statistic" => true},
    tariffs_count: 0,
    agreement: nil
  },
  {
    currency_id: 1,
    legal_entity_id: LegalEntity.find(3).id,
    name: "Голосовой робот KZ",
    state: "active",
    alert_template_email: "<p>Голосовой робот KZ</p>",
    alert_template_sms: "Голосовой робот KZ",
    notify_expires_days: 7,
    ticket: {"tariff" => "voice_robot_kz", "kind" => "calls_bot", "can_suspend" => true, "count_balance" => true, "count_statistic" => true},
    tariffs_count: 0,
    agreement: nil
  }
]
services.each do |service|
  saved_service = Service.create!(service)
  saved_service.countries << Country.where(name: %w[РФ Казахстан Беларусь])
end

(1..75).each do |i|
  Crm.create!(crm: i.to_s)
end

25.times do |i|
  Nomenclature.create(
    code: "code-#{i}",
    name: Faker::Lorem.paragraph
  )
end

(1..25).each do |i|
  setting = [
    {city: "Москва", utc_offset: "3", one_c_id: Faker::Internet.uuid},
    {city: "Казань", utc_offset: "4", one_c_id: Faker::Internet.uuid},
    {city: "Уфа", utc_offset: "5", one_c_id: Faker::Internet.uuid}
  ].sample
  crm = Crm.find_by(crm: i.to_s)
  client = Client.create(
    country_id: Country.find_by(name: "РФ").id,
    crm_id: crm.id,
    name: Faker::Company.name,
    email: (1..rand(1..5)).to_a.each_with_object([]) do |element, arr|
      arr << Faker::Internet.email
    end,
    organization: Faker::Company.industry,
    platform_client_id: i,
    settings: setting
  )
  ClientRequisite.create(
    client_id: client.id,
    company_type: rand(1..3),
    inn: Faker::Company.russian_tax_number,
    kpp: Faker::Bank.account_number(digits: 9),
    full_name: Faker::Commerce.vendor,
    head_chief: Faker::Company.profession,
    act_because_of: Faker::Company.suffix,
    head_chief_signature: Faker::Name.name,
    address: Faker::Address.full_address,
    bank_checking_account: Faker::Bank.account_number,
    bank_cash_account: Faker::Bank.account_number(digits: 13),
    bank_name: Faker::Bank.name,
    bank_bik: Faker::Bank.account_number(digits: 9),
    phone: Faker::Number.number(digits: 12),
    passport_series: "3333",
    passport_number: "333333",
    passport_issued: Faker::Address.full_address,
    passport_issued_date: "01.01.2000"
  )
  uzer = User.create(
    name: Faker::Internet.username,
    login: Faker::Internet.username,
    email: Faker::Internet.email(domain: "example#{i}"),
    password: "1",
    password_confirmation: "1",
    role: Role.find_by(name: :director).name
  )
  uzer.roles << Role.find_by(name: :director)
  crm.users << uzer
end

(26..35).each do |i|
  setting = [
    {city: "Атырау", utc_offset: "4", one_c_id: Faker::Internet.uuid},
    {city: "Актобе", utc_offset: "5", one_c_id: Faker::Internet.uuid},
    {city: "Ташкент", utc_offset: "5", one_c_id: Faker::Internet.uuid}
  ].sample
  client = Client.create(
    country_id: Country.find_by(name: "Казахстан").id,
    crm_id: Crm.find_by(crm: i.to_s).id,
    name: Faker::Company.name,
    email: (1..rand(1..5)).to_a.each_with_object([]) do |element, arr|
      arr << Faker::Internet.email
    end,
    organization: Faker::Company.industry,
    platform_client_id: i,
    settings: setting
  )
  ClientRequisite.create(
    client_id: client.id,
    company_type: rand(1..3),
    inn: Faker::Company.russian_tax_number,
    kpp: Faker::Bank.account_number(digits: 9),
    full_name: Faker::Commerce.vendor,
    head_chief: Faker::Company.profession,
    act_because_of: Faker::Company.suffix,
    head_chief_signature: Faker::Name.name,
    address: Faker::Address.full_address,
    bank_checking_account: Faker::Bank.account_number,
    bank_cash_account: Faker::Bank.account_number(digits: 13),
    bank_name: Faker::Bank.name,
    bank_bik: Faker::Bank.account_number(digits: 9),
    phone: Faker::Number.number(digits: 12),
    passport_series: Faker::Bank.account_number(digits: 4),
    passport_number: Faker::Bank.account_number(digits: 6),
    passport_issued: Faker::Address.full_address,
    passport_issued_date: "01.01.2000"
  )
  uzer = User.create(
    name: Faker::Internet.username,
    login: Faker::Internet.username,
    email: Faker::Internet.email(domain: "example#{i}"),
    password: "1",
    password_confirmation: "1",
    role: Role.find_by(name: :director).name
  )
  uzer.roles << Role.find_by(name: :director)
end
(36..40).each do |i|
  setting = [
    {city: "Минск", utc_offset: "2", one_c_id: Faker::Internet.uuid},
    {city: "Бобруйск", utc_offset: "2", one_c_id: Faker::Internet.uuid},
    {city: "Орша", utc_offset: "2", one_c_id: Faker::Internet.uuid}
  ].sample
  client = Client.create(
    country_id: Country.find_by(name: "Беларусь").id,
    crm_id: Crm.find_by(crm: i.to_s).id,
    name: Faker::Company.name,
    email: (1..rand(1..5)).to_a.each_with_object([]) do |element, arr|
      arr << Faker::Internet.email
    end,
    organization: Faker::Company.industry,
    platform_client_id: i,
    settings: setting
  )
  ClientRequisite.create(
    client_id: client.id,
    company_type: rand(1..3),
    inn: Faker::Company.russian_tax_number,
    kpp: Faker::Bank.account_number(digits: 9),
    full_name: Faker::Commerce.vendor,
    head_chief: Faker::Company.profession,
    act_because_of: Faker::Company.suffix,
    head_chief_signature: Faker::Name.name,
    address: Faker::Address.full_address,
    bank_checking_account: Faker::Bank.account_number,
    bank_cash_account: Faker::Bank.account_number(digits: 13),
    bank_name: Faker::Bank.name,
    bank_bik: Faker::Bank.account_number(digits: 9),
    phone: Faker::Number.number(digits: 12),
    passport_series: Faker::Bank.account_number(digits: 4),
    passport_number: Faker::Bank.account_number(digits: 6),
    passport_issued: Faker::Address.full_address,
    passport_issued_date: "01.01.2000"
  )
  uzer = User.create(
    name: Faker::Internet.username,
    login: Faker::Internet.username,
    email: Faker::Internet.email(domain: "example#{i}"),
    password: "1",
    password_confirmation: "1",
    role: Role.find_by(name: :director).name
  )
  uzer.roles << Role.find_by(name: :director)
end

tariffs = [
  {
    service_id: Service.find_by(name: "SMS").id,
    name: "тариф1 - #{Faker::Beer.brand}",
    kind: "kind_one_time",
    duration_kind: "duration_perpetual",
    advance_payment: 4000.00,
    started_at: rand(1..1000).days.ago,
    extra: {
      smpp_account: [{id: 8, name: "Аккаунт 8"}],
      credit_limit: -1000,
      nomenclature_id: [Nomenclature.find(Nomenclature.ids.sample).slice(:id, :name)],
      documents: Faker::Lorem.word
    }
  },
  {
    service_id: Service.find_by(name: "SMS").id,
    name: "тариф2 - #{Faker::Beer.brand}",
    kind: "kind_one_time",
    duration_kind: "duration_perpetual",
    advance_payment: 10000.00,
    started_at: rand(1..1000).days.ago,
    extra: {
      smpp_account: [{id: 1, name: "Аккаунт 1"}],
      credit_limit: -5000,
      nomenclature_id: [Nomenclature.find(Nomenclature.ids.sample).slice(:id, :name)],
      documents: Faker::Lorem.word
    }
  }
]
tariffs.each do |tariff|
  Tariff.create(tariff)
end

tariffs = [
  {
    service_id: Service.find_by(name: "SMS KZ").id,
    name: "тариф kz 1 - #{Faker::Beer.brand}",
    kind: "kind_one_time",
    duration_kind: "duration_perpetual",
    advance_payment: 4000.00,
    started_at: rand(1..1000).days.ago,
    extra: {
      smpp_account: [{id: 8, name: "Аккаунт 8"}],
      credit_limit: -1000,
      nomenclature_id: [Nomenclature.find(Nomenclature.ids.sample).slice(:id, :name)],
      documents: Faker::Lorem.word
    }
  },
  {
    service_id: Service.find_by(name: "SMS KZ").id,
    name: "тариф kz 2 - #{Faker::Beer.brand}",
    kind: "kind_one_time",
    duration_kind: "duration_perpetual",
    advance_payment: 10000.00,
    started_at: rand(1..1000).days.ago,
    extra: {
      smpp_account: [{id: 1, name: "Аккаунт 1"}],
      credit_limit: -5000,
      nomenclature_id: [Nomenclature.find(Nomenclature.ids.sample).slice(:id, :name)],
      documents: Faker::Lorem.word
    }
  }
]

tariffs.each do |tariff|
  Tariff.create(tariff)
end

tariffs = [
  {
    service_id: Service.find_by(name: "Голосовой робот").id,
    name: "гр - #{Faker::Beer.brand}",
    kind: "kind_periodic",
    duration_kind: "duration_month_start",
    advance_payment: 0,
    started_at: rand(1..1000).days.ago,
    extra: {credit_limit: "0.0", allow_client_subscription: false, allow_with_confirmation: false, changeable: false}
  },
  {
    service_id: Service.find_by(name: "Продвижение сервиса Taxophone").id,
    name: "Турбо реактив - #{Faker::Beer.brand}",
    kind: "kind_periodic",
    duration_kind: "duration_year_date",
    advance_payment: 20000,
    started_at: rand(1..1000).days.ago,
    extra: {credit_limit: "0.0", allow_client_subscription: false, allow_with_confirmation: false, changeable: false}
  },
  {
    service_id: Service.find_by(name: "ПО Друг").id,
    name: "хороший человек - #{Faker::Beer.brand}",
    kind: "kind_periodic",
    duration_kind: "duration_year_date",
    advance_payment: 10000,
    started_at: rand(1..1000).days.ago,
    extra: {credit_limit: "0.0", allow_client_subscription: false, allow_with_confirmation: false, changeable: false}
  },
  {
    service_id: Service.find_by(name: "ПО Друг KZ").id,
    name: "хороший человек - #{Faker::Beer.brand}",
    kind: "kind_periodic",
    duration_kind: "duration_year_date",
    advance_payment: 10000,
    started_at: rand(1..1000).days.ago,
    extra: {credit_limit: "0.0", allow_client_subscription: false, allow_with_confirmation: false, changeable: false}
  },
  {
    service_id: Service.find_by(name: "Техподдержка").id,
    name: "техсаппорт новый - #{Faker::Beer.brand}",
    started_at: rand(1..1000).days.ago,
    kind: "kind_periodic",
    duration_kind: "duration_year_date",
    advance_payment: Seeder.round_up(rand(100000)),
    extra: {
      new_tariff: true,
      new_tariff_hours: [
        {name: "0 часов", price: "0"},
        {name: "5 часов", price: "8000"},
        {name: "20 часов", price: "25000"},
        {name: "100 часов", price: "100000"}
      ],
      new_tariff_slas: [
        {name: "SLA-1", price: "0"},
        {name: "SLA-2", price: "25000"},
        {name: "SLA-3", price: "100000"},
        {name: "SLA-4", price: "300000"}
      ],
      nomenclature_id: [
        Nomenclature.find(Nomenclature.ids.sample).slice(:id, :name)
      ]
    }
  },
  {
    service_id: Service.find_by(name: "Техподдержка KZ").id,
    name: "техсаппорт KZ новый - #{Faker::Beer.brand}",
    started_at: rand(1..1000).days.ago,
    kind: "kind_periodic",
    duration_kind: "duration_year_date",
    advance_payment: Seeder.round_up(rand(1000)),
    extra: {
      new_tariff: true,
      new_tariff_hours: [
        {name: "0 часов", price: "0"},
        {name: "5 часов", price: "10"},
        {name: "20 часов", price: "500"},
        {name: "100 часов", price: "1000"}
      ],
      new_tariff_slas: [
        {name: "SLA-1", price: "0"},
        {name: "SLA-2", price: "300"},
        {name: "SLA-3", price: "7000"},
        {name: "SLA-4", price: "9000"}
      ],
      nomenclature_id: [
        Nomenclature.find(Nomenclature.ids.sample).slice(:id, :name)
      ]
    }
  }
]
tariffs.each do |tariff|
  Tariff.create(tariff)
end

# Создание подписок - начало
russian_clients = Client.where(country_id: Country.find_by(name: "РФ").id).sample(10)
russian_clients.each do |client|
  period_date = rand(10).days.ago
  subscription = Subscription.create(
    client_id: client.id,
    tariff_id: Service.find_by(name: "Техподдержка").tariffs.first.id,
    started_at: period_date,
    ended_at: period_date + 1.year,
    state: "state_new",
    credit_limit: -10000,
    jsondata: {"subscribe_price" => 37000, "new_tariff" => true, "new_tariff_hours" => "5 часов", "new_tariff_slas" => "SLA-2", "renewal" => true, "comment" => "ччччч"}
  )
  ServiceBalance.create(
    client: client,
    service: Service.find_by(name: "Техподдержка"),
    balance: 1_000_000
  )
  Subscriptions::V2::Activator.call(
    subscription: subscription,
    user_id: User.find_by(name: "admin").id,
    transaction_type: 5,
    ip: "127.0.0.1"
  )
end
russian_clients = Client.where(country_id: Country.find_by(name: "РФ").id).sample(7)
russian_clients.each do |client|
  period_date = rand(10).days.ago
  subscription = Subscription.create(
    client_id: client.id,
    tariff_id: Service.find_by(name: "SMS").tariffs.first.id,
    started_at: period_date,
    ended_at: nil,
    state: "state_new",
    credit_limit: -10000,
    jsondata: {renewal: false, sms_login: 1}
  )
  ServiceBalance.create(
    client: client,
    service: Service.find_by(name: "SMS"),
    balance: 1_000_000
  )
  Subscriptions::V2::Activator.call(
    subscription: subscription,
    user_id: User.find_by(name: "admin").id,
    transaction_type: 5,
    ip: "127.0.0.1"
  )
end

russian_clients = Client.where(country_id: Country.find_by(name: "РФ").id).sample(9)
russian_clients.each do |client|
  period_date = rand(10).days.ago
  subscription = Subscriptions::VoiceRobot::Subscription.create(
    client_id: client.id,
    tariff_id: Service.find_by(name: "Голосовой робот").tariffs.first.id,
    started_at: period_date.beginning_of_month,
    ended_at: period_date.end_of_month,
    state: "state_new",
    credit_limit: -50,
    jsondata: {renewal: false}
  )

  ServiceBalance.create(
    client: client,
    service: Service.find_by(name: "Голосовой робот"),
    balance: 1_000_000
  )
  Subscriptions::V2::Activator.call(
    subscription: subscription,
    user_id: User.find_by(name: "admin").id,
    transaction_type: 5,
    ip: "127.0.0.1"
  )
end
# Создание подписок - конец
