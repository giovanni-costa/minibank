import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const roles = this.reflector.get('roles', context.getHandler())

    if(!roles){ return true }

    const request = context.switchToHttp().getRequest()
    
    // Roles is now an Array of allowed roles, if the array includes the user profile, it can consume
    return roles.includes(request.user.role);
  }
}
