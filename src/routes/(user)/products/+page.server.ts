import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createSchemaStep2 } from '$lib/components/products/schemas';
import { getAllTagGroupsWithTags } from '$lib/api/contracts/tag_groups/queries/getAllTagGroupsWithTags';
import type { Actions, PageServerLoad } from './$types';
import { getTagGroupWithTagsBySearchTerm } from '$lib/api/contracts/tag_groups/queries/getTagGroupWithTagsBySearchTerm';

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
	const page = url.searchParams.get('page') || '1';

	const response = await getAllTagGroupsWithTags({
		pageNumber: params ? parseInt(page) : 1,
		pageSize: 50
	});

	return {
		response: {
			tags: response,
			products: [
				{
					id: 1,
					name: 'Fish and Chips',
					description: 'A delicious fish and chips',
					price: 10.99,
					imageUrl:
						'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Fish_and_chips_blackpool.jpg/800px-Fish_and_chips_blackpool.jpg',
					tags: [
						'Peixe',
						'Frito',
						'Batata Frita',
						'Comida Inglesa',
						'Pimenta',
						'Sal',
						'Limão',
						'Farinha de Trigo',
						'Ovo'
					]
				},
				{
					id: 2,
					name: 'Sanduíche de Frango Grelhado',
					description: 'Sanduíche com filé de frango grelhado, alface, tomate e maionese.',
					price: 12.99,
					imageUrl:
						'https://www.hojetemfrango.com.br/wp-content/uploads/2019/01/shutterstock_173394518.jpg',
					tags: ['Sanduíche', 'Frango', 'Grelhado']
				},
				{
					id: 3,
					name: 'Espaguete à Carbonara',
					description:
						'Prato de massa italiana com molho à base de ovos, queijo parmesão, pancetta e pimenta preta.',
					price: 15.5,
					imageUrl:
						'https://www.pingodoce.pt/wp-content/uploads/2015/03/esparguete-a-carbonara.jpg',
					tags: ['Massa', 'Italiana', 'Ovos', 'Queijo', 'Pancetta', 'Cozido']
				},
				{
					id: 4,
					name: 'Tacos de Carne',
					description:
						'Tortilhas de milho recheadas com carne temperada, queijo, alface e molho de pimenta.',
					price: 10.99,
					imageUrl:
						'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/04/Carne-Asada-Tacos-3.jpg',
					tags: ['Tacos', 'Mexicana', 'Carne', 'Frito']
				},
				{
					id: 5,
					name: 'Salada de Quinoa',
					description: 'Salada nutritiva com quinoa, tomate, pepino, pimentão e molho de limão.',
					price: 9.99,
					imageUrl:
						'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/7AB36A02-4077-4399-AF82-9619A7AA9883/Derivates/f0173ebf-9927-45a9-8ef8-e01a77b37822.jpg',
					tags: ['Salada', 'Vegetariana', 'Quinoa', 'Vegetais', 'Cozido']
				},
				{
					id: 6,
					name: 'Sopa de Tomate',
					description: 'Sopa cremosa de tomate com manjericão e croutons.',
					price: 7.5,
					imageUrl: 'https://docerar.pt/wp-content/uploads/2018/06/sopa-tomate.jpg',
					tags: ['Sopa', 'Tomate', 'Cremosa', 'Cozido']
				},
				{
					id: 7,
					name: 'Pão de Queijo',
					description: 'Pãozinho de queijo típico brasileiro, feito com polvilho e queijo minas.',
					price: 6.99,
					imageUrl:
						'https://static.itdg.com.br/images/1200-630/91f752bd7f720be5bc6d209dae386c73/pao-de-queijo-facil-e-delicioso-1-.png',
					tags: ['Pão', 'Queijo', 'Brasileiro', 'Assado']
				},
				{
					id: 8,
					name: 'Risoto de Camarão',
					description: 'Risoto cremoso de camarão com arroz arbóreo e parmesão.',
					price: 18.99,
					imageUrl:
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXOGQmq9dLlsfBlqTKExMeS7RD3GMgr2tuGJFTSJMvMw&s',
					tags: ['Risoto', 'Camarão', 'Arroz', 'Cozido']
				},
				{
					id: 9,
					name: 'Wrap de Vegetais Grelhados',
					description: 'Wrap com vegetais grelhados, queijo feta e molho de iogurte.',
					price: 11.5,
					imageUrl: 'https://www.galloportugal.com/wp-content/uploads/2020/09/Wrap_grelhado2.jpg',
					tags: ['Wrap', 'Vegetais', 'Grelhado']
				},
				{
					id: 10,
					name: 'Macarrão com Molho Pesto',
					description: 'Macarrão com molho pesto de manjericão, pinhões, queijo parmesão e azeite.',
					price: 13.99,
					imageUrl: 'https://i.panelinha.com.br/i1/228-bk-8613-espaguete-ao-pesto.webp',
					tags: ['Massa', 'Italiana', 'Pesto', 'Cozido']
				},
				{
					id: 11,
					name: 'Salmão ao Molho de Maracujá',
					description: 'Filé de salmão grelhado com molho de maracujá e gengibre.',
					price: 22.5,
					imageUrl:
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8y54La2E3ERVdbNUIssaRmkzBXYvWurgFMZ3-hTKKA&s',
					tags: ['Salmão', 'Grelhado', 'Molho de Maracujá', 'Assado']
				},
				{
					id: 12,
					name: 'Nhoque ao Molho de Tomate',
					description: 'Nhoque de batata com molho de tomate caseiro e manjericão fresco.',
					price: 16.99,
					imageUrl: 'https://i.ytimg.com/vi/_MRwSytTPJU/maxresdefault.jpg',
					tags: ['Nhoque', 'Italiano', 'Tomate', 'Cozido']
				},
				{
					id: 13,
					name: 'Salada de Frutas',
					description: 'Mix refrescante de frutas da estação com suco de laranja.',
					price: 8.99,
					imageUrl: 'https://www.receiteria.com.br/wp-content/uploads/salada-de-frutas.jpeg',
					tags: ['Salada', 'Frutas', 'Vegetariana', 'Cozido']
				},
				{
					id: 14,
					name: 'Estrogonofe de Carne',
					description: 'Cubos de carne refogados com creme de leite, molho de tomate e champignon.',
					price: 20.99,
					imageUrl:
						'https://claudia.abril.com.br/wp-content/uploads/2020/02/receita-estrogonofe-de-carne.jpg',
					tags: ['Carne', 'Estrogonofe', 'Cozido']
				},
				{
					id: 15,
					name: 'Frango Assado com Ervas',
					description: 'Peito de frango assado com ervas aromáticas.',
					price: 17.99,
					imageUrl: 'https://claudia.abril.com.br/wp-content/uploads/2020/02/frango_1_0.jpg',
					tags: ['Frango', 'Assado', 'Ervas', 'Assado']
				},
				{
					id: 16,
					name: 'Torta de Limão',
					description: 'Torta gelada de limão com massa crocante e cobertura de merengue.',
					price: 14.5,
					imageUrl: 'https://i.ytimg.com/vi/cc8QuY7seFQ/maxresdefault.jpg',
					tags: ['Sobremesa', 'Torta', 'Limão', 'Cozido']
				},
				{
					id: 17,
					name: 'Lasanha de Berinjela',
					description: 'Camadas de berinjela grelhada, molho de tomate e queijo gratinado.',
					price: 16.5,
					imageUrl:
						'https://www.unileverfoodsolutions.com.br/dam/global-ufs/mcos/SLA/calcmenu/recipes/BR-recipes/pasta-dishes/lasanha-de-berinjela/main-header.jpg',
					tags: ['Lasanha', 'Vegetariana', 'Berinjela', 'Cozido']
				},
				{
					id: 18,
					name: 'Crepe de Chocolate',
					description: 'Crepe recheado com chocolate ao leite e morangos frescos.',
					price: 9.99,
					imageUrl:
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBQyTd3qll_cpPOXQUaTrtWzS1rKWCXMxR8tkL5lSzGg&s',
					tags: ['Crepe', 'Chocolate', 'Sobremesa', 'Frito']
				},
				{
					id: 19,
					name: 'Salada Caesar',
					description:
						'Salada clássica com alface romana, croutons, queijo parmesão e molho Caesar.',
					price: 11.99,
					imageUrl:
						'https://www.pingodoce.pt/wp-content/uploads/2019/07/salada-cesar-com-croutons-1.jpg',
					tags: ['Salada', 'Vegetariana', 'Queijo', 'Molho', 'Cozido']
				},
				{
					id: 20,
					name: 'Risoto de Cogumelos',
					description: 'Risoto cremoso com cogumelos frescos e queijo parmesão.',
					price: 19.99,
					imageUrl:
						'https://www.pingodoce.pt/wp-content/uploads/2021/07/risotto-de-cogumelos-com-caldo-de-espargos.jpeg',
					tags: ['Risoto', 'Italiano', 'Cogumelos', 'Arroz', 'Cozido']
				}
			]
		},
		forms: {
			create: await superValidate(zod(createSchemaStep2))
		}
	};
};

export const actions: Actions = {
	getTagGroupsWithTagsBySearchTerm: async ({ request }) => {
		const data = await request.formData();

		const response = await getTagGroupWithTagsBySearchTerm(data.get('searchTerm') as string);

		return response;
	}
};
