import { BusinessModel, Client, Order, Product, Service } from "../../models";
import { Telephone } from "../models";
import { random } from "./randomId";
import { findClient } from "./search.service";

export class ValuesDefault {
  // Classe criada no intuito de suprir a demanda DoD - Cadastro de 30 clientes e 20 produtos.

  private business: BusinessModel;
  private serviceList: Array<Service>;
  private productList: Array<Product>;
  private clientList: Array<Client>;

  constructor(business: BusinessModel) {
    this.business = business;
    this.serviceList = business.services;
    this.productList = business.products;
    this.clientList = business.clients;
  }

  public create(): void {
    const servicesDefault = this.serviceDefault();
    const productsDefault = this.productsDefault();
    const clientsDefault = this.clientsDefault();

    servicesDefault.forEach((service) => {
      const newService = new Service(service.id, service.name, service.price);
      this.serviceList.push(newService);
    });

    productsDefault.forEach((product) => {
      const newProduct = new Product(
        product.id,
        product.name,
        product.price,
        product.total
      );
      this.productList.push(newProduct);
    });

    clientsDefault.forEach((client) => {
      const phoneList: Telephone[] = [];

      client.phones.forEach(({ ddd, number }) => {
        phoneList.push(new Telephone(ddd, number));
      });
      const id = random(Date.now());
      const newClient = new Client(
        id,
        client.email,
        client.name,
        client.CPF,
        client.birthDate,
        client.gender,
        phoneList
      );
      this.clientList.push(newClient);
    });

    const ordersDefault = this.ordersDefault();
    ordersDefault.forEach((order) => {
      const client: Client = findClient(this.clientList, order.clientId);
      const productCartList: Array<{ product: Product; unit: number }> = [];
      const serviceCartList: Array<{ service: Service; unit: number }> = [];
      order.productCartList.forEach((product, index) => {
        const productPivot = {
          product: product,
          unit: order.productUnit[index],
        };
        productCartList.push(productPivot);
      });
      order.serviceCartList.forEach((service, index) => {
        const servicePivot = { service: service, unit: 1 };
        serviceCartList.push(servicePivot);
      });
      const id = random(Date.now());
      const newOrder = new Order(
        id,
        order.clientId,
        order.dateCreated,
        order.statusPayment,
        order.seller_id,
        order.seller_commission,
        productCartList,
        serviceCartList
      );
      const clientOrders: Order[] = client.orders;
      clientOrders.push(newOrder);

      client.orders = clientOrders;
    });
  }

  serviceDefault() {
    const services = [
      { id: 1, name: "Manicure", price: 25.99 },
      { id: 2, name: "Pedicure", price: 15.99 },
      { id: 3, name: "Design de Sobrancelhas", price: 20 },
      { id: 4, name: "Corte de Cabelo Feminino", price: 69.99 },
      { id: 5, name: "Corte de Cabelo Masculino", price: 39.99 },
      { id: 6, name: "Maquiagem para casamento", price: 110.9 },
      { id: 7, name: "Skin care", price: 74.99 },
      { id: 8, name: "Aplicação botox", price: 560.80 },
      { id: 9, name: "Depilação a cera", price: 249.99 },
      { id: 10, name: "Depilação a lazer", price: 2990.9 },
    ];
    return services;
  }

  productsDefault() {
    const products = [
      { id: 1, name: "Shampoo", price: 59.99, total: 46 },
      { id: 2, name: "Condicionador", price: 49.9, total: 39 },
      { id: 3, name: "Máscara de hidratação", price: 19.9, total: 60 },
      { id: 4, name: "Óleo finalizador", price: 29.9, total: 22 },
      { id: 5, name: "Creme anti-térmico", price: 20.9, total: 50 },
      { id: 6, name: "Delineador", price: 9.9, total: 90 },
      { id: 7, name: "Cera de depilar", price: 30, total: 100 },
      { id: 8, name: "Unhas postiças", price: 12.9, total: 70 },
      { id: 9, name: "Primer", price: 110.9, total: 20 },
      { id: 10, name: "Base", price: 24.9, total: 35 },
      { id: 11, name: "Rímel", price: 3.5, total: 40 },
      { id: 12, name: "Lip tint", price: 49.9, total: 75 },
      { id: 13, name: "Desodorante", price: 12.9, total: 40 },
      { id: 14, name: "Gloss", price: 10.5, total: 7 },
      { id: 15, name: "Esmalte", price: 2.99, total: 400 },
      { id: 16, name: "Água micelar", price: 49.9, total: 100 },
      { id: 17, name: "Delineador", price: 9.9, total: 40 },
      { id: 18, name: "Sombra Líquida", price: 39.9, total: 42 },
      { id: 19, name: "Máscara de Cílios", price: 59.9, total: 47 },
      { id: 20, name: "Blush", price: 54.9, total: 30 },
    ];
    return products;
  }

  ordersDefault() {
    const timestamp = new Date();
    const orderList = [
      {
        clientId: 321,
        dateCreated: timestamp,
        statusPayment: "paid",
        seller_id: 2,
        seller_commission: 3,
        productCartList: this.productList.slice(1, 3),
        serviceCartList: this.serviceList.slice(0, 1),
        productUnit: [4, 5],
      },
      {
        clientId: 111,
        dateCreated: timestamp,
        statusPayment: "paid",
        seller_id: 1,
        seller_commission: 3,
        productCartList: this.productList.slice(5, 7),
        serviceCartList: this.serviceList.slice(4, 5),
        productUnit: [4, 7],
      },
      {
        clientId: 111,
        dateCreated: timestamp,
        statusPayment: "paid",
        seller_id: 1,
        seller_commission: 3,
        productCartList: this.productList.slice(5, 7),
        serviceCartList: this.serviceList.slice(4, 5),
        productUnit: [1, 2],
      },
      {
        clientId: 111,
        dateCreated: timestamp,
        statusPayment: "paid",
        seller_id: 1,
        seller_commission: 3,
        productCartList: this.productList.slice(0, 1),
        serviceCartList: this.serviceList.slice(2, 3),
        productUnit: [3],
      },
      {
        clientId: 1234,
        dateCreated: timestamp,
        statusPayment: "paid",
        seller_id: 3,
        seller_commission: 3,
        productCartList: this.productList.slice(1, 3),
        serviceCartList: this.serviceList.slice(3, 4),
        productUnit: [3, 2],
      },
      {
        clientId: 1112,
        dateCreated: timestamp,
        statusPayment: "paid",
        seller_id: 3,
        seller_commission: 3,
        productCartList: this.productList.slice(7, 9),
        serviceCartList: this.serviceList.slice(6, 7),
        productUnit: [4, 1],
      },
      {
        clientId: 11113,
        dateCreated: timestamp,
        statusPayment: "paid",
        seller_id: 2,
        seller_commission: 3,
        productCartList: this.productList.slice(6, 9),
        serviceCartList: this.serviceList.slice(8, 9),
        productUnit: [1, 4, 1],
      },
      {
        clientId: 1112,
        dateCreated: timestamp,
        statusPayment: "paid",
        seller_id: 3,
        seller_commission: 3,
        productCartList: this.productList.slice(5, 9),
        serviceCartList: this.serviceList.slice(3, 4),
        productUnit: [3, 2, 4, 1],
      },
      {
        clientId: 1112,
        dateCreated: timestamp,
        statusPayment: "paid",
        seller_id: 3,
        seller_commission: 3,
        productCartList: this.productList.slice(2, 7),
        serviceCartList: this.serviceList.slice(0, 1),
        productUnit: [1, 1, 1, 1, 2, 1],
      },
      {
        clientId: 1112,
        dateCreated: timestamp,
        statusPayment: "paid",
        seller_id: 3,
        seller_commission: 3,
        productCartList: this.productList.slice(7, 9),
        serviceCartList: this.serviceList.slice(4, 5),
        productUnit: [1, 1],
      },
    ];

    return orderList;
  }

  clientsDefault() {
    const clients = [
      {
        email: "vinicius@email.com",
        name: "Vinicius Buarque",
        CPF: "33333333333",
        birthDate: new Date("05/31/2000"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 31213111 },
        ],
      },
      {
        email: "ednaldo@email.com",
        name: "Ednaldo Pereira",
        CPF: "33333333332",
        birthDate: new Date("07/11/1999"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 78457332 },
        ],
      },
      {
        email: "henrique@email.com",
        name: "Henrique Moura",
        CPF: "33333333331",
        birthDate: new Date("01/01/2002"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 23568606 },
        ],
      },
      {
        email: "mariaeduarda@email.com",
        name: "Maria Eduarda",
        CPF: "1234",
        birthDate: new Date("01/24/2001"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 98554100 },
        ],
      },
      {
        email: "ericalonghi@email.com",
        name: "Erica Longhi",
        CPF: "1112",
        birthDate: new Date("07/11/1999"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 745522100 },
        ],
      },
      {
        email: "sofia@email.com",
        name: "Sofia Abreu",
        CPF: "11113",
        birthDate: new Date("04/01/2002"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 99856641 },
        ],
      },
      {
        email: "jimin@email.com",
        name: "Park Jimin",
        CPF: "10",
        birthDate: new Date("08/10/1995"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 31213111 },
        ],
      },
      {
        email: "jungkook@email.com",
        name: "Jeon Jungkook",
        CPF: "11",
        birthDate: new Date("01/11/1994"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 78457332 },
        ],
      },
      {
        email: "taetae@email.com",
        name: "kim taehyung",
        CPF: "01",
        birthDate: new Date("01/01/1920"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 23568606 },
        ],
      },
      {
        email: "Marta@email.com",
        name: "Marta Maria",
        CPF: "0100",
        birthDate: new Date("01/24/1980"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 98554100 },
        ],
      },
      {
        email: "Formiga@email.com",
        name: "Maria Formiga",
        CPF: "0080",
        birthDate: new Date("07/11/1975"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 745522100 },
        ],
      },
      {
        email: "Gabi@email.com",
        name: "Gabi Jaruska",
        CPF: "10110",
        birthDate: new Date("04/01/2005"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 99856641 },
        ],
      },
      {
        email: "Fabiano@email.com",
        name: "Fabiano Curuzes",
        CPF: "04475",
        birthDate: new Date("08/24/1995"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 31213111 },
        ],
      },
      {
        email: "Fabricio@email.com",
        name: "Fabricio Ferreira",
        CPF: "795444",
        birthDate: new Date("07/11/1977"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 78457332 },
        ],
      },
      {
        email: "Bruno@email.com",
        name: "Bruno Moura",
        CPF: "78874",
        birthDate: new Date("01/01/1999"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 23568606 },
        ],
      },
      {
        email: "Fernanda@email.com",
        name: "Fernanda Lima",
        CPF: "54555",
        birthDate: new Date("01/24/1979"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 98554100 },
        ],
      },
      {
        email: "BrunaMarquize@email.com",
        name: "Bruna Marquezine",
        CPF: "696967",
        birthDate: new Date("07/11/1997"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 964738953 },
          { ddd: 12, number: 745522100 },
        ],
      },
      {
        email: "surfistine@email.com",
        name: "Bruna Surfista",
        CPF: "626974",
        birthDate: new Date("04/01/1992"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 44599822 },
          { ddd: 12, number: 99856641 },
        ],
      },
      {
        email: "Cauan@email.com",
        name: "Cauan Reimont Gato",
        CPF: "101010",
        birthDate: new Date("08/24/1991"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 44599822 },
          { ddd: 12, number: 31213111 },
        ],
      },
      {
        email: "CaioBla@email.com",
        name: "Nelson Ferreira",
        CPF: "0004",
        birthDate: new Date("07/11/1979"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 44599822 },
          { ddd: 12, number: 78457332 },
        ],
      },
      {
        email: "ChicoBoarque@email.com",
        name: "Chico Boarque",
        CPF: "10014",
        birthDate: new Date("01/01/1943"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 44599822 },
          { ddd: 12, number: 23568606 },
        ],
      },
      {
        email: "MarianaRiston@email.com",
        name: "Mariana Riston",
        CPF: "405742",
        birthDate: new Date("01/24/1949"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 44599822 },
          { ddd: 12, number: 98554100 },
        ],
      },
      {
        email: "MicheleObama@email.com",
        name: "Michele Obama",
        CPF: "99942",
        birthDate: new Date("07/11/1999"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 74449668 },
          { ddd: 12, number: 745522100 },
        ],
      },
      {
        email: "SabrinaALvez@email.com",
        name: "Sabrina Alvez Clara",
        CPF: "875441",
        birthDate: new Date("04/01/2002"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 74449668 },
          { ddd: 12, number: 99856641 },
        ],
      },
      {
        email: "thiago@email.com",
        name: "Thiago Ferreira",
        CPF: "123",
        birthDate: new Date("08/24/2001"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 931223211 },
          { ddd: 12, number: 31213111 },
        ],
      },
      {
        email: "nelson@email.com",
        name: "Nelson Ferreira",
        CPF: "321",
        birthDate: new Date("07/11/1999"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 931223211 },
          { ddd: 12, number: 78457332 },
        ],
      },
      {
        email: "henrique@email.com",
        name: "Henrique Moura",
        CPF: "111",
        birthDate: new Date("01/01/2002"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 931223211 },
          { ddd: 12, number: 23568606 },
        ],
      },
      {
        email: "MariaElena@email.com",
        name: "Maria Elena",
        CPF: "1234",
        birthDate: new Date("01/24/2001"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 982229518 },
          { ddd: 12, number: 98554100 },
        ],
      },
      {
        email: "LuizBrito@email.com",
        name: "Luiza Brito",
        CPF: "1112",
        birthDate: new Date("07/11/1999"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 982229518 },
          { ddd: 12, number: 745522100 },
        ],
      },
      {
        email: "gatinhabonitinha@email.com",
        name: "Ana Clara",
        CPF: "11113",
        birthDate: new Date("04/01/2002"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 982229518 },
          { ddd: 12, number: 99856641 },
        ],
      },
      {
        email: "no@email.com",
        name: "no Ferreira",
        CPF: "5454777",
        birthDate: new Date("08/24/1988"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 982229518 },
          { ddd: 12, number: 31213111 },
        ],
      },
      {
        email: "CabritoTevez@email.com",
        name: "Cabrito Tevez Ferreira",
        CPF: "742235",
        birthDate: new Date("07/11/1980"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 982229518 },
          { ddd: 12, number: 78457332 },
        ],
      },
      {
        email: "SilvioSantos@email.com",
        name: "Silvio Santos MAOI",
        CPF: "441478",
        birthDate: new Date("01/01/1930"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 9822295182 },
          { ddd: 12, number: 23568606 },
        ],
      },
      {
        email: "PatriciaAbrabanel@email.com",
        name: "Patricia Abrabanel",
        CPF: "365214",
        birthDate: new Date("01/24/1980"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 982229518 },
          { ddd: 12, number: 98554100 },
        ],
      },
      {
        email: "DaniloGentil@email.com",
        name: "Danilo Gentil",
        CPF: "786668",
        birthDate: new Date("07/11/1987"),
        gender: "Masculino",
        phones: [
          { ddd: 12, number: 982229518 },
          { ddd: 12, number: 745522100 },
        ],
      },
      {
        email: "MeganFox@email.com",
        name: "Megan Fox",
        CPF: "7878784444",
        birthDate: new Date("04/01/1985"),
        gender: "Feminino",
        phones: [
          { ddd: 12, number: 982229518 },
          { ddd: 12, number: 99856641 },
        ],
      },
    ];
    return clients;
  }
}
