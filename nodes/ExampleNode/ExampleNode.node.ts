import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class ExampleNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Example',
    name: 'exampleNode',
    icon: {
      light: 'file:../../icons/example.svg',
      dark: 'file:../../icons/example.dark.svg',
    },
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Point de départ pour un nœud personnalisé n8n",
    defaults: {
      name: 'Example',
    },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    usableAsTool: true,
    credentials: [
      {
        name: 'exampleApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Get',
            value: 'get',
            description: "Récupérer une ressource distante",
            action: 'Get a resource',
          },
        ],
        default: 'get',
      },
      {
        displayName: 'Resource ID',
        name: 'resourceId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
          show: {
            operation: ['get'],
          },
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        if (operation === 'get') {
          const resourceId = this.getNodeParameter('resourceId', i) as string;

          const response = await this.helpers.httpRequestWithAuthentication.call(
            this,
            'exampleApi',
            {
              method: 'GET',
              url: `/resources/${resourceId}`,
              json: true,
            },
          );

          returnData.push({
            json: response as IDataObject,
            pairedItem: { item: i },
          });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: (error as Error).message },
            pairedItem: { item: i },
          });
          continue;
        }
        throw new NodeOperationError(this.getNode(), error as Error, {
          itemIndex: i,
        });
      }
    }

    return [returnData];
  }
}
