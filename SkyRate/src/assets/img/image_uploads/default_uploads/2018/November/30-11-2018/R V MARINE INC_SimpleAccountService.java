package com.pge.coc.common.service.account;

public interface SimpleAccountService {
	public String getPersonId(String accountNumber)throws Exception;
	public String getPhoneNumberByPersonId(String personId)throws Exception;
	public String getPhoneNumberByAccountNumber(String accountNumber)throws Exception;

}
