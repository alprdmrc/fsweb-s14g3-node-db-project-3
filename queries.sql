-- Multi-Table Sorgu Pratiği

-- Tüm ürünler(product) için veritabanındaki ProductName ve CategoryName'i listeleyin. (77 kayıt göstermeli)
select ProductName, Ca.CategoryName 
from Product as Pr
left join Category as Ca
on Pr.CategoryId=Ca.Id;

-- 9 Ağustos 2012 öncesi verilmiş tüm siparişleri(order) için sipariş id'si (Id) ve gönderici şirket adını(CompanyName)'i listeleyin. (429 kayıt göstermeli)
select O.Id, Sh.CompanyName
from [Order] as O
left join Shipper as Sh
on O.ShipVia=Sh.Id
where O.OrderDate < "2012-08-09"

-- Id'si 10251 olan siparişte verilen tüm ürünlerin(product) sayısını ve adını listeleyin. ProdcutName'e göre sıralayın. (3 kayıt göstermeli)
select OD.Quantity, Pr.ProductName
from [OrderDetail] as OD
left join Product as Pr
on OD.ProductId = Pr.Id
where OD.OrderId = 10251;

-- Her sipariş için OrderId, Müşteri'nin adını(Company Name) ve çalışanın soyadını(employee's LastName). Her sütun başlığı doğru bir şekilde isimlendirilmeli. (16.789 kayıt göstermeli)
select O.Id, C.CompanyName as CompanyName, E.LastName as "employee's LastName"
from [Order] as O
join Employee as E
on O.EmployeeId=E.Id
join Customer as C
on O.CustomerId=C.Id;