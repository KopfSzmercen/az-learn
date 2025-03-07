@description('The environment name')
param environmentName string = 'dev'

@description('The Azure region for resources')
param location string = resourceGroup().location

@description('SQL Server administrator login')
param sqlAdminLogin string

@description('SQL Server administrator password')
@secure()
param sqlAdminPassword string

@description('GitHub repository name (org/repo)')
param repositoryName string

@description('Container image tag (usually commit SHA)')
param imageTag string
  

// SQL Server resource
resource sqlServer 'Microsoft.Sql/servers@2022-05-01-preview' = {
  name: 'az-learn-${environmentName}'
  location: location
  properties: {
    administratorLogin: sqlAdminLogin
    administratorLoginPassword: sqlAdminPassword
    version: '12.0'
  }
}

// SQL Database resource
resource sqlDatabase 'Microsoft.Sql/servers/databases@2022-05-01-preview' = {
    parent: sqlServer
    name: 'BookCatalogDb'
    location: location
    sku: {
      name: 'Basic'
      tier: 'Basic'
    }
}

// Allow Azure services to access the SQL server
resource sqlFirewallRule 'Microsoft.Sql/servers/firewallRules@2022-05-01-preview' = {
    parent: sqlServer
    name: 'AllowAllAzureIps'
    properties: {
      startIpAddress: '0.0.0.0'
      endIpAddress: '0.0.0.0'
    }
}

// Container Apps Environment
// Log Analytics Workspace
resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2021-06-01' = {
  name: 'logAnalyticsWorkspace-${environmentName}'
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 5
  }
}

// Container Apps Environment
resource containerAppEnvironment 'Microsoft.App/managedEnvironments@2022-10-01' = {
  name: 'az-learn-env-${environmentName}'
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalyticsWorkspace.properties.customerId
        sharedKey: logAnalyticsWorkspace.listKeys().primarySharedKey
      }
    }
  }
}

// Container App
resource containerApp 'Microsoft.App/containerApps@2024-03-01' = {
    name: 'az-learn-app-${environmentName}'
    location: location
    properties: {
      managedEnvironmentId: containerAppEnvironment.id
      configuration: {
        ingress: {
          external: true
          targetPort: 8080
        }
        secrets: [
          {
            name: 'sql-connection-string'
            value: 'Server=tcp:${sqlServer.name}${environment().suffixes.sqlServerHostname},1433;Initial Catalog=${sqlDatabase.name};Persist Security Info=False;User ID=${sqlAdminLogin};Password=${sqlAdminPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;'
          }
        ]
      }
      template: {
        containers: [
          {
            name: 'bookcatalog'
            image: 'ghcr.io/${repositoryName}/bookcatalog:${imageTag}'
            env: [
              {
                name: 'ConnectionStrings__Database'
                secretRef: 'sql-connection-string'
              }
            ]
            resources: {
              #disable-next-line BCP036
              cpu: '0.25'
              memory: '.5Gi'
            }
          }
        ]
        scale: {
          minReplicas: 1
          maxReplicas: 1
        }
      }
    }
}
  // Output the Container App URL
output containerAppUrl string = 'https://${containerApp.properties.configuration.ingress.fqdn}'
