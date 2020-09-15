package com.pge.cfs.rest.client;

import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponents;

/**
 * 
 *
 */
public interface AbstractRestClient {

	/**
	 * @param queryParams
	 * @param uri
	 * @return
	 */
	UriComponents getUri(Map<String, String> queryParams, String uri);

	/**
	 * @param uriComponents
	 * @param method
	 * @param classType
	 * @return
	 * @throws Exception
	 */
	<T> ResponseEntity<?> restClientRequestForQueryParam(UriComponents uriComponents, HttpMethod method, Class<T> classType, Map<String, String> headers) throws Exception;

	/**
	 * @param instance
	 * @param uri
	 * @param method
	 * @param classType
	 * @return
	 * @throws Exception
	 */
	<T> ResponseEntity<?> restClientRequestForObject(Object instance, String uri, HttpMethod method, Class<T> classType, Map<String, String> headers) throws Exception;

	
	public <T> ResponseEntity<?> restClientRequestForUri(UriComponents uriComponents, HttpMethod method,  ParameterizedTypeReference<T> responseType , Map<String, String> headers) throws Exception ;
	
	
	/**
	 * @param body
	 * @return
	 */
	String[] getStringArrayFromResponse(String body);
	
	
}
