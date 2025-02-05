import { Container, Injectable } from '~/helpers/helper.di'

@Injectable()
export class UserMetadata {
  user(): string {
    return Container.resolve<string>('User')
  }
}
