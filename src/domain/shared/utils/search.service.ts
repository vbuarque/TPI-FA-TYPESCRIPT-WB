import { Client, Product, Service } from "../../models";
import { Input } from "./NumberText.input";

const input = new Input();

const findClient = (clientList: Array<Client>, cpf?: number) => {
  let cpfNumber = !cpf ? input.text(`Informe o CPF do cliente: `) : cpf;

  const clientFiltered = clientList.filter(
    (client) => client.getCpf() == cpfNumber
  );

  if (clientFiltered.length == 0) {
    console.log("Cliente não encontrado, digite novamente o CPF!");
    return findClient(clientList);
  }
  return clientFiltered[0];
};

const findProduct = (productList: Array<Product>, id?: number) => {
  let productCode = !id ? input.number(`Código do produto: `) : id;

  const productFiltered = productList.filter(
    (product) => product.id === productCode
  );

  if (productFiltered.length == 0) {
    console.log("Produto não encontrado, digite novamente o Código!");
    return findProduct(productList);
  }
  return productFiltered[0];
};

const findService = (serviceList: Array<Service>, id?: number) => {
  let serviceCode = !id ? input.number(`Código do serviço: `) : id;

  const serviceFiltered = serviceList.filter(
    (service) => service.id === serviceCode
  );

  if (serviceFiltered.length == 0) {
    console.log("Serviço não encontrado, digite novamente o Código!");
    return findService(serviceList);
  }
  return serviceFiltered[0];
};

const findOrder = (clientList: Array<Client>, id?: number) => {
  const client: Client = findClient(clientList);
  let orderCode = !id ? input.number(`Código do pedido: `) : id;

  const orderFiltered = client.orders.filter((order) => order.id === orderCode);

  if (orderFiltered.length == 0) {
    console.log("Pedido não encontrado, digite novamente o código!");
    return findOrder(clientList);
  }
  return orderFiltered[0];
};

export { findClient, findProduct, findService, findOrder };
